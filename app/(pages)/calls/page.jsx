import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import CallsTable from "./table";

export default async function Calls({ searchParams }) {
  const session = await getServerSession(authOptions);
  const profile = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/profiles?email=${session.user.email}`
  )
    .then((res) => res.json())
    .then((res) => res[0]);

  let calls = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/calls?organisation.id=${profile.organisation.id}`
  ).then((res) => res.json());

  const headings = [
    "call ID",
    "date",
    "agent",
    "handle time",
    "silent time",
    "topic",
    "agent score",
    "team",
  ];

  const relations = {
    "call ID": "_id",
    date: "recorded",
    agent: "agent",
    "handle time": "duration",
    "silent time": "silent",
    topic: "topic",
    "agent score": "total_agent_score",
    team: "team",
  };

  let organisation = profile.organisation;

  return (
    <>
      <CallsTable calls={calls} headings={headings} />
    </>
  );
}
