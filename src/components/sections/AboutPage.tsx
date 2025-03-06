const AboutPage = () => {
    return (
        <div className="h-screen flex bg-black text-white relative">
            {/* Centered "About Me" at the Top */}
            <h2 className="absolute top-28 left-1/2 transform -translate-x-1/2 text-4xl font-bold">About Me</h2>

            <section className="flex-1 flex items-center justify-center">
                <div className="flex w-full">
                    {/* Left Section (Empty - Can be used later) */}
                    <div className="flex-1 text-center"></div>

                    {/* Right Section (Main Content) */}
                    <div className="flex-1 text-right pr-8">
                        <p className="text-lg mt-4 text-right">Hi, I'm Lester, The Jack of All Trades Junior Developer.</p>
                        <p className="text-white text-lg tracking-wide leading-relaxed text-right">
                            From idea generation to product creation. <br/>
                            From deployment to marketing and maintenance. <br/>
                            I can execute and be a part of it all.
                        </p>
                        <p className="text-white text-lg tracking-wide leading-relaxed text-right">
                            With my technical and soft skills, alongside my innate programming capabilities enhanced with my expertise of taking AI tools to the next level.
                        </p>
                        <p className="text-white text-lg tracking-wide leading-relaxed text-right">
                            <span className="relative inline-block">THERE IS NOTHING WE CAN'T CREATE
                                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-white [box-shadow:0_0_10px_#fff,0_0_20px_#fff,0_0_30px_#fff,0_0_40px_#fff,0_0_70px_#fff]"></span>
                            </span>!
                        </p>
                        <br />
                        <p className="text-white text-lg tracking-wide leading-relaxed text-right">
                            I may be a <span className="text-white text-xl [text-shadow:0_0_7px_#0099ff,0_0_14px_#0099ff,0_0_21px_#0099ff,0_0_42px_#0099ff,0_0_82px_#0099ff]">MASTER OF NONE</span>, But I will always <span className="text-white text-xl [text-shadow:0_0_7px_#00cc66,0_0_14px_#00cc66,0_0_21px_#00cc66,0_0_42px_#00cc66,0_0_82px_#00cc66]">GET IT DONE</span>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;