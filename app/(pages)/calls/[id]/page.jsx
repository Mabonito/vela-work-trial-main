import { getServerSession } from "next-auth";

import VelaPageTitle from "../../../components/layout/title";

import CallInfo from "./callDetails";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import BackButton from "../../../components/calls/BackButton";

export default async function CallPage({ params }) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  const profile = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/profiles?email=${session.user.email}`
  )
    .then((res) => res.json())
    .then((res) => res[0]);
  console.log(profile);
  
  const call = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/calls/${id}`
  ).then((res) => res.json());
  console.log(call);

  const organisations = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/organisations`
  ).then((res) => res.json());
  console.log(organisations);

  const url = call.audio_path;

  return (
    <>
      <div className="flex justify-between items-end">
        <div className="flex items-center space-x-5">
          <BackButton />
          <VelaPageTitle title={"Call - Detailed View"} />
        </div>
      </div>

      <CallInfo call={call} url={url} organisations={organisations}/>
    </>
  );
}

function findPlaceholdersToReveal(
  sentence,
  redactionSettings,
  orgPlaceholders
) {
  // Use a regular expression to match all words within triangular brackets
  let regex = /<[^>]+>/g;
  let matches = sentence.match(regex) || [];
  return matches.filter((match) => orgPlaceholders.includes(match));
}
const getOrgPlaceholders = (redactionSettings) => {
  const redactable = {
    creditCard: "<CREDIT_CARD>",
    ibanCode: "<IBAN_CODE>",
    person: "<PERSON>",
    location: "<LOCATION>",
    crypto: "<CRYPTO>",
    phoneNumber: "<PHONE_NUMBER>",
    email: "<EMAIL_ADDRESS>",
    nrp: "<NRP>",
    ipAddress: "<IP_ADDRESS>",
    dateTime: "<DATE_TIME>",
    url: "<URL>",
    idNumber: "<ID_NUMBER>",
  };

  const orgEntities = redactionSettings
    ? Object.entries(redactionSettings).filter(([key, value]) => value)
    : [];

  return orgEntities.map(([key, value]) => redactable[key]);
};

function revealInfo(original, redacted, placeholders, words) {
  // Split the original and redacted strings into arrays of words
  // logger.info(`OGs: ${original} - ${redacted}`);
  let originalWords = original.split(" ").filter(Boolean);
  let redactedWords = redacted.split(" ").filter(Boolean);
  originalWords = JSON.parse(JSON.stringify(originalWords));
  redactedWords = JSON.parse(JSON.stringify(redactedWords));
  // logger.info(`lists: ${originalWords} - ${redactedWords}`);
  let testOW = [];
  for (let i = 0; i < originalWords.length; i++) {
    if (originalWords[i].length > 0) {
      testOW.push(originalWords[i]);
    }
  }
  // logger.info(`testOW: ${testOW}`);

  // Create an object to store the substitutions
  let substitutes = {};
  // Create a regex pattern to match the placeholder

  // Initialize an index to keep track of where we are in the original string
  let originalIndex = 0;

  // Loop through the redacted words and replace the chosen placeholder
  for (let i = 0; i < redactedWords.length; i++) {
    let regex = /<[^>]+>/g;
    let match = redactedWords[i].match(regex);
    // If the current word matches the placeholder, replace it
    if (match) {
      // Find the corresponding word(s) in the original string
      let replacement = [];
      replacement.push(originalIndex);

      originalIndex++;
      while (
        originalIndex < originalWords.length &&
        originalWords[originalIndex] !== redactedWords[i + 1]
      ) {
        replacement.push(originalIndex);

        originalIndex++;
      }

      // Join the replacement words and replace the placeholder
      if (match[0] in substitutes) {
        substitutes[match[0]].words.push(replacement);
      } else {
        substitutes[match[0]] = { words: [replacement] };
      }
    } else {
      originalIndex++;
    }
    // console.log(redactedWords);
  }
  // Replace the placeholders in the original string
  let updatedString = Object.entries(substitutes).filter(([key, value]) => {
    return placeholders.includes(key);
  });
  let values = [];
  updatedString.forEach(([key, value]) => {
    for (let i of value.words) {
      values.push(i);
    }
  });
  // console.log(updatedString);
  return values;
}

const getRedactedTimestamps = (
  segments,
  redactionSettings,
  orgPlaceholders
) => {
  let redactedTimestamps = [];
  segments.forEach((segment) => {
    if (segment.redaction && segment.words.length > 0) {
      let placeholders = findPlaceholdersToReveal(
        segment.redaction,
        redactionSettings,
        orgPlaceholders
      );

      let wordSegments = revealInfo(
        segment.transcription,

        segment.redaction,

        placeholders
      );

      wordSegments.forEach((value) => {
        if (value.length > 0) {
          let timestamps = getMuteTimestamps(
            segment?.words,
            value,
            segment.start,
            segment.end
          );
          redactedTimestamps = redactedTimestamps.concat(timestamps);
          // if (segment?.words[value[0]]?.start) {
          //   redactedTimestamps.push({
          //     start:
          //       segment?.words[value[0]]?.start * 1000 + segment.start - 500,
          //     end:
          //       segment?.words[value[value.length - 1]]?.end * 1000 +
          //       segment.start +
          //       500,
          //   });
          // }
        }
      });
    }
  });

  return redactedTimestamps;
};

function getMuteTimestamps(
  words,
  muteIndexes,
  sentenceStartTimestamp,
  sentenceEndTimestamp
) {
  let result = [];

  muteIndexes.forEach((index) => {
    let wordObj = words[index];
    if (wordObj === undefined) {
      return;
    }
    let startTimestamp = null;
    let endTimestamp = null;

    // Find the previous word with a timestamp
    for (let i = index - 1; i >= 0; i--) {
      if (words[i].end !== undefined) {
        startTimestamp = words[i].end * 1000 + sentenceStartTimestamp - 500;
        break;
      }
    }

    // Find the next word with a timestamp
    for (let i = index + 1; i < words.length; i++) {
      if (words[i].start !== undefined) {
        endTimestamp = words[i].start * 1000 + sentenceStartTimestamp + 100;
        break;
      }
    }

    // If the word has its own timestamps, use them
    if (wordObj.start !== undefined && wordObj.end !== undefined) {
      startTimestamp = wordObj.start * 1000 + sentenceStartTimestamp - 500;
      endTimestamp = wordObj.end * 1000 + sentenceStartTimestamp + 100;
    } else {
      // If no previous word with timestamps, use the end of the sentence
      if (startTimestamp === null) {
        startTimestamp = sentenceStartTimestamp; // Or any other fallback start time if necessary
      }
      if (endTimestamp === null) {
        endTimestamp = sentenceEndTimestamp;
      }
    }

    result.push({
      word: wordObj.word,
      start: startTimestamp,
      end: endTimestamp,
    });
  });

  return result;
}
