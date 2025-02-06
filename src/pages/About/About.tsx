const About = () => {
  return (
    <div className="pt-10">
      <div className="sm:px-3 bg-[#f4eee0] py-14 space-y-10 text-center">
        <p className="text-lg font-semibold uppercase">the papier story</p>
        <h1 className="text-5xl">
          We believe that STATIONERY <br /> is more than pen and paper.
        </h1>
        <h1 className="text-5xl">
          It’s a powerful way to make each day <br /> NOTEWORTHY.
        </h1>
        <p>
          Founded in 2015, Papier invites magic into the everyday with premium{" "}
          <br />
          paper treasures for every desk. Whether setting out your wildest
          dreams on <br /> a page or scribbling a to-do list to get you ready
          for the day – stationery is a <br /> space to think, to connect, to
          plan, to celebrate.
        </p>
      </div>
      <div className="px-2 md:px-6 xl:px-28">
        <video className="w-full" autoPlay loop muted>
          <source src="/vedio.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* paragraph row */}
      <div className="px-2 md:px-6 xl:px-28 space-y-20 mt-20">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            The Essence of Papier Stationery
          </h1>
          <p>
            Papier stationery is a seamless blend of elegance, functionality,
            and innovation, crafted to inspire and delight. Each product is
            meticulously crafted, reflecting a cultural dedication to precision
            and attention to detail. From sleek pens that glide effortlessly to
            beautifully designed notebooks that enhance productivity, Papier
            stationery transforms ordinary tools into extraordinary experiences.
          </p>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            More Than Utility: A Celebration of Creativity
          </h1>
          <p>
            At its heart, Papier stationery is about more than utility—it is an
            expression of creativity, where traditional aesthetics meet modern
            technology. It elevates everyday tasks with beauty and purpose,
            transforming writing, organizing, and creating into activities
            filled with inspiration and joy.
          </p>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">The Bungu Experience</h1>
          <p>
            Bungu is a curated destination for Papier stationery enthusiasts,
            offering a seamless and transparent shopping experience that feels
            as comfortable and familiar as buying locally. Whether you’re
            seeking the perfect pen, advice on organizing your desk, or even
            tips for exploring Japan’s cultural landmarks, our team is here to
            help. At Bungu, we believe in creating meaningful connections
            through exceptional service and a deep appreciation for Papier
            design and craftsmanship.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
