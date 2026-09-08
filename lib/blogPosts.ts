export type QABlock = {
  type: "qa";
  question: string;
  answer: string;
  sourceName?: string;
  sourceUrl?: string;
};

export type ImageBlock = {
  type: "image";
  caption: string;
};

export type PostBlock = QABlock | ImageBlock;

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  pillar: string;
  tags: string[];
  publishedAt: string; // ISO date
  coverCaption: string;
  blocks: PostBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "meet-maranda",
    title: "Meet Maranda",
    description:
      "A Q&A getting to know Maranda Jones outside the treatment room — bingo nights, trivia, hiking, and travel.",
    pillar: "Her Story",
    tags: ["Her Story", "Meet Maranda", "About"],
    publishedAt: "2026-08-11",
    coverCaption: "Maranda Jones, LMT — photo coming soon",
    blocks: [
      {
        type: "qa",
        question: "When you're not doing massage, what does a day off actually look like?",
        answer:
          "Honestly, kind of scattered. Bingo one night, trivia the next, a hike on the weekend if the weather's good. I don't really have one hobby — I just don't like sitting still, so I'm usually out doing something.",
      },
      {
        type: "qa",
        question: "Bingo and trivia? That's not really what people picture their massage therapist doing.",
        answer:
          "I know, I get that a lot. People expect someone very zen all the time, and I'm not that outside of work. I like a little competition. Trivia especially — I'm not even that good at it, I just like the chaos of it.",
      },
      { type: "image", caption: "Trivia night with friends — photo coming soon" },
      {
        type: "qa",
        question: "What about the hiking and travel side of things?",
        answer:
          "Grand Junction is honestly a great home base for that — there's no shortage of trails nearby, and I try to get out of town a few times a year when my schedule allows. I'm not an extreme-adventure person, I just genuinely don't like sitting around.",
      },
      {
        type: "qa",
        question: "Does any of that show up in how you work with clients?",
        answer:
          "I think so. A lot of my regulars are people trying to stay active — training, hiking, whatever it is — and I get that on a personal level, not just a professional one. I'm not telling anyone to slow down; I'm trying to help them keep doing the things they actually want to do.",
      },
      { type: "image", caption: "On a trail near Grand Junction — photo coming soon" },
      {
        type: "qa",
        question: "Any hobby that surprises people when they hear about it?",
        answer:
          "Probably the bingo, honestly. It feels like a grandma hobby and I fully embrace that. I'll take a good bingo hall over a quiet night in most of the time.",
      },
    ],
  },
  {
    slug: "what-to-expect-during-your-massage",
    title: "What to Expect During Your Massage",
    description:
      "A Q&A walkthrough of a typical massage session — the intake conversation, draping, positioning, and what's normal to expect, sourced from Mayo Clinic and AMTA.",
    pillar: "Know Your Massage",
    tags: ["Know Your Massage", "First Visit", "FAQ"],
    publishedAt: "2026-08-25",
    coverCaption: "Inside the treatment room — photo coming soon",
    blocks: [
      {
        type: "qa",
        question: "What actually happens before the massage starts?",
        answer:
          "We'll talk for a few minutes first — what's going on, any areas you want extra attention on, anything I should know about your health. That short intake conversation about your goals and any medical conditions is standard practice before a session begins, not something specific to PeaceFlow.",
        sourceName: "AMTA: What to Expect at Your Massage Session",
        sourceUrl: "https://www.amtamassage.org/find-massage-therapist/what-to-expect-at-massage-session/",
      },
      {
        type: "qa",
        question: "Do I have to undress all the way?",
        answer:
          "No. You undress to whatever level you're comfortable with, and you're covered with a sheet the entire time except for the area actively being worked on.",
        sourceName: "Mayo Clinic: Massage therapy",
        sourceUrl: "https://www.mayoclinic.org/tests-procedures/massage-therapy/about/pac-20384595",
      },
      { type: "image", caption: "A draped massage table, ready for a session — photo coming soon" },
      {
        type: "qa",
        question: "What position will I be in?",
        answer:
          "Most sessions start with you lying face-down and switch to face-up partway through. If lying face-down isn't comfortable for you for any reason, we adjust — lying on your side works too.",
        sourceName: "Mayo Clinic Press: What to expect during a massage therapist visit",
        sourceUrl: "https://mcpress.mayoclinic.org/living-well/what-to-expect-during-a-massage-therapist-visit/",
      },
      {
        type: "qa",
        question: "What's the room actually like?",
        answer:
          "Quiet and private, with the lights kept low. Nothing about it is meant to feel clinical.",
        sourceName: "AMTA: What to Expect at Your Massage Session",
        sourceUrl: "https://www.amtamassage.org/find-massage-therapist/what-to-expect-at-massage-session/",
      },
      { type: "image", caption: "PeaceFlow's treatment room — photo coming soon" },
      {
        type: "qa",
        question: "What if the pressure isn't right or something feels off partway through?",
        answer:
          "Say something, right away — pressure that's too light or too deep, a spot you'd rather I skip, the room temperature, any of it. Speaking up mid-session is a completely normal part of getting a massage, not an interruption.",
        sourceName: "AMTA: What to Expect at Your Massage Session",
        sourceUrl: "https://www.amtamassage.org/find-massage-therapist/what-to-expect-at-massage-session/",
      },
    ],
  },
  {
    slug: "how-often-should-i-get-a-massage",
    title: "How Often Should I Get a Massage?",
    description:
      "A Q&A on massage frequency — general wellness, chronic pain, and stress relief — with guidance sourced from Healthline and Cleveland Clinic.",
    pillar: "Know Your Massage",
    tags: ["Know Your Massage", "Recovery", "FAQ"],
    publishedAt: "2026-09-01",
    coverCaption: "Booking calendar and candles — photo coming soon",
    blocks: [
      {
        type: "qa",
        question: "Is there a general rule of thumb?",
        answer:
          "For general wellness, once a month to once every six weeks is the range most massage resources point to. There's no single official standard — it really comes down to what you're using massage for.",
        sourceName: "Healthline: How Often Should You Get a Massage?",
        sourceUrl: "https://www.healthline.com/health/pain-relief/how-often-should-you-get-a-massage",
      },
      {
        type: "qa",
        question: "What if I'm dealing with a specific injury or chronic pain?",
        answer:
          "Weekly or every other week tends to work better for chronic pain or active recovery — that's meaningfully more frequent than a once-in-a-while treat-yourself massage.",
        sourceName: "Healthline: How Often Should You Get a Massage?",
        sourceUrl: "https://www.healthline.com/health/pain-relief/how-often-should-you-get-a-massage",
      },
      { type: "image", caption: "Between-session stretching — photo coming soon" },
      {
        type: "qa",
        question: "What if I just want to de-stress?",
        answer:
          "Monthly or every other month is usually enough if relaxation is the main goal, rather than working through a specific problem area.",
        sourceName: "Healthline: How Often Should You Get a Massage?",
        sourceUrl: "https://www.healthline.com/health/pain-relief/how-often-should-you-get-a-massage",
      },
      {
        type: "qa",
        question: "Does the type of massage change the math?",
        answer:
          "In my experience, yes. My deep tissue regulars — mostly gym-goers dealing with recurring tightness — tend to land closer to every two to four weeks. Someone getting a therapeutic massage just for overall relaxation might comfortably go longer between visits. You can see how the two compare on the services page.",
      },
      { type: "image", caption: "Deep tissue session in progress — photo coming soon" },
      {
        type: "qa",
        question: "Should I just ask you directly?",
        answer:
          "Yes, always. A good massage therapist should personalize frequency to you rather than hand out a one-size answer, and that's echoed by larger healthcare organizations that offer massage as part of broader care, not just as a stand-alone service.",
        sourceName: "Cleveland Clinic: Therapeutic Massage",
        sourceUrl: "https://health.clevelandclinic.org/therapeutic-massage-can-great-addition-treatment",
      },
    ],
  },
  {
    slug: "what-should-i-do-before-my-appointment",
    title: "What Should I Do Before My Appointment?",
    description:
      "A Q&A on preparing for a massage — eating, hydration, and what to wear — including a common myth debunked by the American Massage Therapy Association.",
    pillar: "At-Home Care",
    tags: ["At-Home Care", "First Visit", "FAQ"],
    publishedAt: "2026-09-05",
    coverCaption: "Getting ready for your session — photo coming soon",
    blocks: [
      {
        type: "qa",
        question: "Should I eat beforehand?",
        answer:
          "A light meal an hour or two before is fine — just skip anything heavy right before your session. You'll be lying face-down for part of it, and a full stomach doesn't make that comfortable.",
      },
      {
        type: "qa",
        question: "What about drinking water — do I need to flush out toxins after?",
        answer:
          "This one's actually a bit of a myth. The idea that massage releases \"toxins\" that need to be flushed with water isn't backed by scientific evidence, according to the American Massage Therapy Association. That said, normal hydration is still good for you and your muscles, same as any other day — just not for the reason the myth suggests.",
        sourceName: "AMTA: Massage Therapy Myths vs. Truths",
        sourceUrl:
          "https://www.amtamassage.org/publications/massage-therapy-journal/myths-versus-truths-in-massage-therapy/",
      },
      { type: "image", caption: "Water bottle and comfortable clothes — photo coming soon" },
      {
        type: "qa",
        question: "Should I shower first?",
        answer: "Not required — just come as you are. If it makes you more comfortable, sure, but it's not expected.",
      },
      {
        type: "qa",
        question: "What should I wear?",
        answer:
          "Something easy to get in and out of. You'll undress to your comfort level once we're in the room, and you're draped with a sheet the whole time either way.",
        sourceName: "AMTA: What to Expect at Your Massage Session",
        sourceUrl: "https://www.amtamassage.org/find-massage-therapist/what-to-expect-at-massage-session/",
      },
      { type: "image", caption: "Comfortable, easy-to-remove layers — photo coming soon" },
      {
        type: "qa",
        question: "Anything else I should mention when I get there?",
        answer:
          "Yes — any allergies to oils or lotions, recent injuries, or areas that are off-limits. The more I know before we start, the better the session is built around what you actually need.",
        sourceName: "AMTA: What to Expect at Your Massage Session",
        sourceUrl: "https://www.amtamassage.org/find-massage-therapist/what-to-expect-at-massage-session/",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
