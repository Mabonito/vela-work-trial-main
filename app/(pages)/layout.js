import "../globals.css";
import ANTDThemeProvider from "../components/providers/antdTheme";
import VelaDrawer from "../components/layout/drawer";
import Navbar from "../components/layout/navbar/navBar";
import Footer from "../components/layout/footer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({ children }) {

    const session = await getServerSession(authOptions);

    const retrievedProfile = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/profiles?email=${session.user.email}`).then((res) => res.json()).then((res) => res[0] || "")
    return (
        <ANTDThemeProvider>
            <div className="flex h-full grid-cols-2 !w-full">
                <VelaDrawer profile={retrievedProfile} />

                <div className="relative flex flex-col w-full">
                    <Navbar />
                    <div className="px-6 py-6 mb-3 mr-8 flex flex-col flex-1 overflow-y-auto">

                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </ANTDThemeProvider>
    );
}