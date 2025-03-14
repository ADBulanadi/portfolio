import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import Link from "next/link";
import { Navigation } from "../components/nav";
import data from "../../data.json";
import { getUser, getSocialAccounts } from "../data";
import Image from "next/image";

export const runtime = "nodejs";

export default async function AboutMe(props) {
  const searchParams = await props.searchParams;
  const { customUsername } = searchParams;
  const username =
    customUsername || process.env.GITHUB_USERNAME || data.githubUsername;

  const userData = getUser(username);
  const socialsData = getSocialAccounts(username);
  const [user, githubSocials] = await Promise.all([userData, socialsData]);
  const rawGithubSocials = Array.isArray(githubSocials) ? githubSocials : [];

  const email = user.email || data.email;
  const contacts = [
    {
      icon: <GoMail size={20} />,
      href: "mailto:" + email,
      label: "Email",
      handle: email,
    },
    {
      icon: <FaGithub size={20} />,
      href: "https://github.com/" + username,
      label: "Github",
      handle: username,
    },
  ];

  rawGithubSocials.forEach((s) => {
    switch (s.provider) {
      case "linkedin":
        contacts.push({
          icon: <FaLinkedin size={20} />,
          href: s.url,
          label: "LinkedIn",
          handle: s.url.split("/").pop(),
        });
        break;
      case "facebook":
        contacts.push({
          icon: <FaFacebook size={20} />,
          href: s.url,
          label: "Facebook",
          handle: s.url.split("/").pop(),
        });
        break;
    }
  });

  return (
    <div className="bg-linear-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
      <Navigation />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-12">
        {/* Left Content */}
        <div className="text-white w-full md:w-2/3">
          <h1 className="text-5xl font-bold mb-6">About Me</h1>
          <p className="text-lg">Name: Aldrin Dan Yra Bulanadi</p>
          <p className="text-lg">
            Location: Valenzuela City, Metro Manila, Philippines
          </p>
          <p className="text-lg">Birthday: December 24, 1998</p>
          <p className="text-lg">Occupation: Web Developer (Full Stack)</p>
          <h2 className="text-3xl font-semibold mt-6">Education</h2>
          <p className="text-lg">Bachelor's in Information Technology</p>
          <p className="text-lg">
            Polytechnic University of the Philippines (2015 - 2019)
          </p>
          <p className="text-lg">
            Cum Laude | Student Leader Awardee | President's Lister
          </p>

          <h2 className="text-3xl font-semibold mt-6">Technical Skills</h2>
          <p className="text-lg">
            Frontend: HTML, CSS, JavaScript, React, Angular, Vue.js, Bootstrap,
            TailWindCSS
          </p>
          <p className="text-lg">
            Backend: Node.js, PHP, Laravel, Symfony, Java, Django, Python
            (Knowledgeable)
          </p>
          <p className="text-lg">Databases: MySQL, MSSQL, MongoDB, MariaDB</p>
          <p className="text-lg">
            DevOps: AWS, Azure, Docker, Kubernetes, Terraform
          </p>
          <p className="text-lg">
            API Integration: HighCharts, OpenLayer, OpenAI, PowerBI & Tableau,
            Filestack
          </p>
          <p className="text-lg">OS: Windows, Linux</p>
          <p className="text-lg">
            AI/Machine Learning: PyCaret, TensorFlow, Pytorch
          </p>
          <h2 className="text-3xl font-semibold mt-6">Hobbies</h2>
          <p className="text-lg">💻 Coding & Web Development</p>
          <p className="text-lg">🎨 UI/UX Design</p>
          <p className="text-lg">📚 Reading & Writing</p>
          <p className="text-lg">🌍 Exploring New Technologies</p>
          <p className="text-lg">🎮 Gaming</p>
        </div>
        {/* Right Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src="/me.jpg"
            alt="Aldrin Dan Yra Bulanadi"
            width={300}
            height={300}
            className="rounded-full shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
