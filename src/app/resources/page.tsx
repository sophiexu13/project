"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";

const categories = [
  "All",
  "Crisis support",
  "Peer support",
  "Find care",
  "Learn & cope",
  "Identity & relationships",
] as const;

type Category = (typeof categories)[number];
type FilterCategory = Exclude<Category, "All">;

type Resource = {
  name: string;
  organization: string;
  description: string;
  details: string;
  categories: readonly FilterCategory[];
  topics: readonly string[];
  href: string;
  action: string;
  urgent?: boolean;
};

const resources: readonly Resource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    organization: "988 Lifeline",
    description: "Call, text, or chat with a trained crisis counselor. You do not have to be suicidal to reach out.",
    details: "Free, confidential support 24/7 across the U.S. and its territories.",
    categories: ["Crisis support"],
    topics: ["suicide", "anxiety", "depression", "loneliness", "substance use"],
    href: "https://988lifeline.org/get-help/",
    action: "Call, text, or chat",
    urgent: true,
  },
  {
    name: "Crisis Text Line",
    organization: "Crisis Text Line",
    description: "Text HOME to 741741 to connect with a trained volunteer Crisis Counselor.",
    details: "Free, confidential text support 24/7 in the U.S.",
    categories: ["Crisis support"],
    topics: ["text", "stress", "self-harm", "bullying", "relationships"],
    href: "https://www.crisistextline.org/",
    action: "Get text support",
    urgent: true,
  },
  {
    name: "The Trevor Project",
    organization: "The Trevor Project",
    description: "Crisis support and affirming resources created for LGBTQ+ young people.",
    details: "Call, text, or chat with a counselor 24/7.",
    categories: ["Crisis support", "Identity & relationships"],
    topics: ["LGBTQ+", "identity", "coming out", "suicide", "community"],
    href: "https://www.thetrevorproject.org/get-help/",
    action: "Get help",
  },
  {
    name: "Teen Line",
    organization: "Teen Line",
    description: "Peer-to-peer support and practical information for teens who want to talk with someone their age.",
    details: "Teen listeners are trained and supervised by mental health professionals.",
    categories: ["Peer support"],
    topics: ["peer", "friends", "family", "school", "stress"],
    href: "https://www.teenline.org/",
    action: "Visit Teen Line",
  },
  {
    name: "You Are Okay",
    organization: "Child Mind Institute",
    description: "Straightforward, expert-backed guides made for teens and young adults.",
    details: "Explore anxiety, depression, ADHD, relationships, school, family, and social media.",
    categories: ["Learn & cope", "Identity & relationships"],
    topics: ["anxiety", "depression", "ADHD", "autism", "social media", "family"],
    href: "https://youareokay.org/",
    action: "Explore guides",
  },
  {
    name: "NAMI Teen & Young Adult Resources",
    organization: "National Alliance on Mental Illness",
    description: "Information for finding help, talking with parents or friends, and handling mental health at school.",
    details: "Includes a directory of youth and young-adult support resources.",
    categories: ["Learn & cope", "Find care"],
    topics: ["school", "parents", "friends", "mental illness", "local support"],
    href: "https://www.nami.org/your-journey/kids-teens-and-young-adults/",
    action: "Browse NAMI resources",
  },
  {
    name: "Mental Health Resource Center",
    organization: "The Jed Foundation",
    description: "Practical tools and expert answers for emotional health, relationships, stress, anger, and loneliness.",
    details: "Designed for teens and young adults navigating everyday challenges.",
    categories: ["Learn & cope", "Peer support"],
    topics: ["stress", "loneliness", "anger", "friends", "college"],
    href: "https://jedfoundation.org/our-work/equipping-individuals/",
    action: "Find tools",
  },
  {
    name: "FindTreatment.gov",
    organization: "SAMHSA",
    description: "Search for mental health and substance-use treatment near you.",
    details: "A confidential and anonymous U.S. government treatment locator.",
    categories: ["Find care"],
    topics: ["therapy", "counseling", "treatment", "substance use", "local"],
    href: "https://www.findtreatment.gov/",
    action: "Find treatment",
  },
  {
    name: "Eating Disorder Support",
    organization: "National Eating Disorders Association",
    description: "Screening, treatment search, support groups, and guidance for talking about food or body-image concerns.",
    details: "The screening tool is a first step and does not provide a diagnosis.",
    categories: ["Find care", "Learn & cope"],
    topics: ["eating", "body image", "screening", "treatment", "support groups"],
    href: "https://www.nationaleatingdisorders.org/get-help/",
    action: "Find support",
  },
  {
    name: "Love Is Respect",
    organization: "Love Is Respect",
    description: "Help with dating abuse and unhealthy relationships. Text LOVEIS to 22522 or call 1-866-331-9474.",
    details: "Free and confidential support for young people, 24/7.",
    categories: ["Crisis support", "Identity & relationships"],
    topics: ["dating", "relationships", "abuse", "boyfriend", "girlfriend", "text"],
    href: "https://www.loveisrespect.org/",
    action: "Get support",
  },
  {
    name: "National Sexual Assault Hotline",
    organization: "RAINN",
    description: "Talk to a trained staff member if you have experienced sexual violence. Call 800-656-4673 or chat online.",
    details: "Free, confidential, and open 24/7.",
    categories: ["Crisis support"],
    topics: ["sexual assault", "abuse", "rape", "harassment", "chat"],
    href: "https://rainn.org/",
    action: "Get help",
  },
  {
    name: "SAMHSA National Helpline",
    organization: "SAMHSA",
    description: "Free treatment referrals and information for mental health and substance use. Call 1-800-662-4357.",
    details: "Confidential, 24/7, in English and Spanish.",
    categories: ["Find care"],
    topics: ["treatment", "substance use", "alcohol", "drugs", "referral"],
    href: "https://www.samhsa.gov/find-help/helplines/national-helpline",
    action: "Call the helpline",
  },
  {
    name: "Trans Lifeline",
    organization: "Trans Lifeline",
    description: "A trans-led hotline for trans people. Call or text (877) 565-8860.",
    details: "Support from people who understand.",
    categories: ["Crisis support", "Identity & relationships"],
    topics: ["trans", "transgender", "nonbinary", "LGBTQ+", "identity"],
    href: "https://translifeline.org/",
    action: "Call or text",
  },
  {
    name: "Steve Fund Crisis Text Line",
    organization: "The Steve Fund",
    description: "Text STEVE to 741741 to reach a trained crisis counselor.",
    details: "Focused on young people of color, 24/7.",
    categories: ["Crisis support", "Identity & relationships"],
    topics: ["text", "students of color", "race", "college", "crisis"],
    href: "https://www.stevefund.org/crisistextline/",
    action: "Get text support",
  },
  {
    name: "Childhelp National Child Abuse Hotline",
    organization: "Childhelp",
    description: "Talk to a counselor about abuse at home or anywhere else. Call or text 1-800-422-4453.",
    details: "Free, confidential, and open 24/7.",
    categories: ["Crisis support"],
    topics: ["abuse", "family", "home", "safety", "neglect"],
    href: "https://www.childhelphotline.org/",
    action: "Call or text",
  },
  {
    name: "National Runaway Safeline",
    organization: "National Runaway Safeline",
    description: "Support if you are thinking about running away or are not safe at home. Call 1-800-786-2929.",
    details: "Free and confidential, 24/7. Chat is also available.",
    categories: ["Crisis support"],
    topics: ["runaway", "home", "family", "homeless", "safety"],
    href: "https://www.1800runaway.org/",
    action: "Get help",
  },
  {
    name: "National Domestic Violence Hotline",
    organization: "The Hotline",
    description: "Help if someone at home or in a relationship is hurting you. Call 1-800-799-7233 or text START to 88788.",
    details: "Free, confidential, and open 24/7.",
    categories: ["Crisis support", "Identity & relationships"],
    topics: ["domestic violence", "abuse", "relationships", "family", "safety"],
    href: "https://www.thehotline.org/",
    action: "Get help",
  },
  {
    name: "StrongHearts Native Helpline",
    organization: "StrongHearts Native Helpline",
    description: "Domestic and sexual violence support for Native Americans and Alaska Natives. Call 1-844-762-8483.",
    details: "Free, confidential, and anonymous, 24/7.",
    categories: ["Crisis support", "Identity & relationships"],
    topics: ["Native", "Indigenous", "abuse", "relationships", "safety"],
    href: "https://strongheartshelpline.org/",
    action: "Get support",
  },
  {
    name: "Take It Down",
    organization: "National Center for Missing & Exploited Children",
    description: "Help removing nude or explicit images of you that were taken before you turned 18.",
    details: "Free and anonymous. Your photos never leave your device.",
    categories: ["Crisis support", "Learn & cope"],
    topics: ["images", "sextortion", "online safety", "social media", "privacy"],
    href: "https://takeitdown.ncmec.org/",
    action: "Start removal",
  },
  {
    name: "ANAD",
    organization: "National Association of Anorexia Nervosa and Associated Disorders",
    description: "Free eating disorder helpline, support groups, and recovery mentors. Call (888) 375-7767.",
    details: "Helpline open Monday to Friday.",
    categories: ["Peer support", "Find care"],
    topics: ["eating", "body image", "support groups", "mentor", "recovery"],
    href: "https://anad.org/",
    action: "Find support",
  },
  {
    name: "Active Minds",
    organization: "Active Minds",
    description: "Start a chapter at your school and learn how to support your friends.",
    details: "Free programs for high school and college students.",
    categories: ["Peer support"],
    topics: ["school", "friends", "clubs", "advocacy", "students"],
    href: "https://www.activeminds.org/",
    action: "Get involved",
  },
  {
    name: "Sad Girls Club",
    organization: "Sad Girls Club",
    description: "A community for girls and young women of color, with chat spaces, events, and therapy scholarships.",
    details: "Focused on reducing stigma around mental health.",
    categories: ["Peer support", "Identity & relationships"],
    topics: ["girls", "women of color", "community", "therapy", "stigma"],
    href: "https://www.sadgirlsclub.org/",
    action: "Join the community",
  },
  {
    name: "Bring Change to Mind",
    organization: "Bring Change to Mind",
    description: "Start a club at your high school to talk about mental health and fight stigma.",
    details: "Free resources for student-led clubs.",
    categories: ["Peer support"],
    topics: ["school", "clubs", "stigma", "friends", "students"],
    href: "https://bringchange2mind.org/",
    action: "Start a club",
  },
  {
    name: "Seize the Awkward",
    organization: "Ad Council, NAMI, and AFSP",
    description: "Tips and conversation guides for checking in on a friend who is struggling.",
    details: "Help for you, too, if you need it.",
    categories: ["Peer support", "Learn & cope"],
    topics: ["friends", "talking", "support", "conversation", "suicide prevention"],
    href: "https://seizetheawkward.org/",
    action: "Get tips",
  },
  {
    name: "NoFiltr",
    organization: "Thorn",
    description: "Teen advice and resources for staying safe online. Text NOFILTR to 741741 for immediate help.",
    details: "Made with young people.",
    categories: ["Learn & cope"],
    topics: ["online safety", "social media", "sextortion", "images", "privacy"],
    href: "https://nofiltr.org/",
    action: "Explore NoFiltr",
  },
  {
    name: "National Alliance for Eating Disorders",
    organization: "National Alliance for Eating Disorders",
    description: "Free eating disorder helpline staffed by therapists. Call (866) 662-1235.",
    details: "Open Monday to Friday, 9am to 7pm ET.",
    categories: ["Find care", "Learn & cope"],
    topics: ["eating", "body image", "treatment", "therapist", "helpline"],
    href: "https://www.allianceforeatingdisorders.com/",
    action: "Call the helpline",
  },
  {
    name: "Project HEAL",
    organization: "Project HEAL",
    description: "Help paying for and finding eating disorder treatment.",
    details: "Offers cash assistance, case management, and meal support.",
    categories: ["Find care"],
    topics: ["eating", "treatment", "cost", "insurance", "recovery"],
    href: "https://www.theprojectheal.org/",
    action: "Get help",
  },
  {
    name: "Open Path Collective",
    organization: "Open Path Collective",
    description: "Lower-cost therapy online or in person for people in financial need.",
    details: "Sessions cost $40 to $70 after a one-time membership fee.",
    categories: ["Find care"],
    topics: ["therapy", "cost", "affordable", "counseling", "therapist"],
    href: "https://openpathcollective.org/",
    action: "Find a therapist",
  },
  {
    name: "Psychology Today Therapist Finder",
    organization: "Psychology Today",
    description: "Search for therapists near you by location, insurance, and specialty.",
    details: "Filter for therapists who work with teens.",
    categories: ["Find care"],
    topics: ["therapy", "therapist", "counseling", "insurance", "local"],
    href: "https://www.psychologytoday.com/us/therapists",
    action: "Find a therapist",
  },
  {
    name: "Therapy for Black Girls",
    organization: "Therapy for Black Girls",
    description: "A directory of therapists for Black women and girls, plus a podcast and articles.",
    details: "Search by location or for virtual sessions.",
    categories: ["Find care", "Identity & relationships"],
    topics: ["Black girls", "therapy", "therapist", "women of color", "podcast"],
    href: "https://therapyforblackgirls.com/",
    action: "Find a therapist",
  },
  {
    name: "Mental Health Screening",
    organization: "Mental Health America",
    description: "Free, confidential screenings for depression, anxiety, and more.",
    details: "A screening is a first step and not a diagnosis.",
    categories: ["Learn & cope", "Find care"],
    topics: ["screening", "test", "depression", "anxiety", "check-in"],
    href: "https://screening.mhanational.org/",
    action: "Take a screening",
  },
  {
    name: "Center for Young Women's Health",
    organization: "Boston Children's Hospital",
    description: "Health guides for teen girls on emotions, periods, nutrition, and more.",
    details: "Written by doctors and reviewed for teens.",
    categories: ["Learn & cope"],
    topics: ["girls", "periods", "emotions", "nutrition", "health"],
    href: "https://youngwomenshealth.org/",
    action: "Read the guides",
  },
  {
    name: "TeensHealth",
    organization: "Nemours",
    description: "Clear answers to questions about your body, mind, and feelings.",
    details: "Reviewed by doctors.",
    categories: ["Learn & cope"],
    topics: ["health", "stress", "feelings", "body", "school"],
    href: "https://kidshealth.org/en/teens/",
    action: "Explore TeensHealth",
  },
  {
    name: "Dove Self-Esteem Project",
    organization: "Dove",
    description: "Free lessons and tools for building body confidence and self-esteem.",
    details: "Made for young people, parents, and teachers.",
    categories: ["Learn & cope"],
    topics: ["body image", "self-esteem", "confidence", "girls", "social media"],
    href: "https://www.dove.com/us/en/dove-self-esteem-project.html",
    action: "Explore the project",
  },
  {
    name: "Anxiety & Depression Association of America",
    organization: "ADAA",
    description: "Information about anxiety and depression, plus tips for coping and finding help.",
    details: "Includes resources for teens and families.",
    categories: ["Learn & cope"],
    topics: ["anxiety", "depression", "OCD", "panic", "coping"],
    href: "https://adaa.org/",
    action: "Learn more",
  },
  {
    name: "Girls Inc.",
    organization: "Girls Inc.",
    description: "Programs that help girls build confidence and grow strong, smart, and bold.",
    details: "Local programs across the U.S. and Canada.",
    categories: ["Peer support", "Learn & cope"],
    topics: ["girls", "confidence", "mentoring", "programs", "community"],
    href: "https://girlsinc.org/",
    action: "Find a program",
  },
  {
    name: "StopBullying.gov",
    organization: "U.S. Department of Health and Human Services",
    description: "What to do if you are being bullied online or in person, and how to help others.",
    details: "Information for teens, parents, and schools.",
    categories: ["Learn & cope"],
    topics: ["bullying", "cyberbullying", "school", "friends", "online safety"],
    href: "https://www.stopbullying.gov/",
    action: "Learn more",
  },
  {
    name: "It Gets Better Project",
    organization: "It Gets Better Project",
    description: "Stories and resources for LGBTQ+ young people from people who have been there.",
    details: "Find support in your area.",
    categories: ["Identity & relationships"],
    topics: ["LGBTQ+", "stories", "coming out", "identity", "community"],
    href: "https://itgetsbetter.org/",
    action: "Explore stories",
  },
  {
    name: "The AAKOMA Project",
    organization: "The AAKOMA Project",
    description: "Mental health tools, toolkits, and therapy for young people of color.",
    details: "Connects youth to more support when they need it.",
    categories: ["Identity & relationships", "Find care"],
    topics: ["youth of color", "therapy", "toolkits", "race", "culture"],
    href: "https://aakomaproject.org/",
    action: "Explore resources",
  },
  {
    name: "We R Native",
    organization: "Northwest Portland Area Indian Health Board",
    description: "Health and wellness resources made for Native youth.",
    details: "By Native youth, for Native youth.",
    categories: ["Identity & relationships", "Learn & cope"],
    topics: ["Native", "Indigenous", "culture", "wellness", "identity"],
    href: "https://wernative.npaihb.org/",
    action: "Visit We R Native",
  },
];

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");

  const filteredResources = useMemo(() => {
    const search = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const categoryMatches = category === "All" || resource.categories.some((item) => item === category);
      const searchable = [resource.name, resource.organization, resource.description, resource.details, ...resource.categories, ...resource.topics].join(" ").toLowerCase();
      return categoryMatches && (!search || searchable.includes(search));
    });
  }, [category, query]);

  return (
    <main id="main" className="page page-wide">
      <PageHeader
        title="Teen mental health resources"
        subtitle="Search by what you're feeling or filter by the kind of support you want."
      />

      <div className="rise rise-2">
        <div className="resource-controls">
          <label className="search">
            <span className="sr-only">Search mental health resources</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search resources"
            />
          </label>

          <div className="filters" role="group" aria-label="Filter by support type">
            {categories.map((item) => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="results-bar" aria-live="polite">
          <p>
            {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
          </p>
          {(query || category !== "All") && (
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>
              Clear filters
            </button>
          )}
        </div>

        {filteredResources.length > 0 ? (
          <div className="resource-grid">
            {filteredResources.map((resource) => (
              <a
                className={`card resource${resource.urgent ? " urgent" : ""}`}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                key={resource.name}
              >
                <h2>{resource.name}</h2>
                <p>{resource.description}</p>
                <span className="resource-action">{resource.action} ↗</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="card empty">
            <h2>No resources match that search.</h2>
            <p className="muted" style={{ margin: 0 }}>Try a broader word or clear the filters to see everything.</p>
          </div>
        )}

        <p className="fine" style={{ marginTop: 20 }}>
          These links offer information and support, but they are not a substitute for care from a qualified mental health
          professional. Availability and services may vary by location.
        </p>
      </div>
    </main>
  );
}
