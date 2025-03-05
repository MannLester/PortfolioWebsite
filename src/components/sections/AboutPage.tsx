const AboutPage = () => {
    return (
        <div className="h-screen flex flex-col bg-black text-white">
            <section className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">About Me</h2>
                    <p className="text-lg mt-4">Hi, I'm Lester, a passionate developer with a love for creating innovative solutions...</p>
                    {/* Skills, Experience, Hobbies sections here */}
                </div>
            </section>
            {/* Optional: Add a footer or additional sections */}
        </div>
    );
}

export default AboutPage;