import Background from "../components/shared/Background";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Background>
            <main className="min-h-screen p-0 mx-36 relative z-10 bg-transparent rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100/40">
                {children}
            </main>
        </Background>
    );
}