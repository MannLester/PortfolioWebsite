const AboutPage = () => {
    return (
        <div className="h-screen flex bg-black text-white">
            <section className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">About Me</h2>
                    <p className="text-lg mt-4">Hi, I'm Lester, a passionate developer with a love for creating innovative solutions...</p>
                    {/* <p className="text-white text-lg tracking-wide leading-relaxed">This is the About Page where we provide more information about the portfolio and the developer.</p> */}
                    {/* Skills, Experience, Hobbies sections here */}
                    <p className="text-white text-lg tracking-wide leading-relaxed">
                        The Jack of All Trades Junior Developer.
                        <br />
                        <br />
                        From idea generation to product creation. From deployment to marketing and maintenance. I can execute and be a part of it all.
                    </p>
                    <p className="text-white text-lg tracking-wide leading-relaxed">
                        With my technical and soft skills, alongside my innate programming capabilities enhanced with my expertise of taking AI tools to the next level.
                    </p>
                    <p className="text-white text-lg tracking-wide leading-relaxed">
                        <span className="relative inline-block">THERE IS NOTHING WE CAN'T CREATE<span className="absolute -bottom-2 left-0 w-full h-[3px] bg-white [box-shadow:0_0_10px_#fff,0_0_20px_#fff,0_0_30px_#fff,0_0_40px_#fff,0_0_70px_#fff]"></span></span>!
                    </p>
                    <br />
                    <p className="text-white text-lg tracking-wide leading-relaxed">
                        I may be a <span
                        className="text-white text-xl [text-shadow:0_0_7px_#0099ff,0_0_14px_#0099ff,0_0_21px_#0099ff,0_0_42px_#0099ff,0_0_82px_#0099ff]"
                        >MASTER OF NONE</span>, But I will always <span
                        className="text-white text-xl [text-shadow:0_0_7px_#00cc66,0_0_14px_#00cc66,0_0_21px_#00cc66,0_0_42px_#00cc66,0_0_82px_#00cc66]"
                        >GET IT DONE</span>.
                    </p>
                </div>
            </section>
            {/* Optional: Add a footer or additional sections */}
        </div>
    );
}

export default AboutPage;