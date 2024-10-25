// pages/index.tsx
"use client";
import { useState, useEffect } from "react";
import AdminKeyModal from "./Util/AdminModal";
import { toast } from "react-toastify";

const Home = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/checkAuth");
      if (res.ok) {
        setIsAuthenticated(true);
        toast.success("User authenticated");
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailParams = {
      to_email: companyEmail,
      from_name: "Kartic Joshi",
      message_html: previewContent(),
      file_name: "finalResume.pdf",
    };

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailParams),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Email sent successfully!");
      toast.success(message);
    } else {
      setMessage(data.error || "Failed to send email. Try again later.");
      toast.error(message);
    }
  };

  const previewContent = () => `
   <p>Dear Hiring Manager,</p>
   <br/>
<p>
  I am writing to express my interest in an open position at
  <span> ${companyName} </span>. Having recently completed my B.Tech in
  Information Technology, I am eager to contribute my skills and experience in
  full-stack development to your team.
</p>
<br/>
<p>
  I have a strong background in web and mobile development, as demonstrated in
  my projects <span> Attendex </span> and <span> EcoSorter </span>, which
  utilize technologies like <span> React, Node.js, TypeScript, and Postgres
  </span>. During my internship at <span> Acowale </span>, I built
  authentication systems and optimized user interfaces, working with modern
  tools such as <span> Figma, Docker </span>, and frameworks like <span>
  Tailwind CSS </span>. I have also developed a range of applications that
  showcase my expertise in <span> React Native, Firebase, </span> and <span>
  Tauri </span>.
</p>
<br/>
<p>
  You can view my portfolio at <a href="https://megacreate.netlify.app"
    >megacreate.netlify.app</a
  >
  and explore my projects on GitHub at
  <a href="https://github.com/Megahedron69"> github.com/Megahedron69 </a>. I
  look forward to discussing how I can contribute to your innovative projects.
</p>
<br/>
<br/>
<p>Thank you for considering my application.</p>
<br/>
<p>
  Sincerely,
  <br />
  Kartic Joshi
</p>

  `;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      {!isAuthenticated && (
        <AdminKeyModal onSuccess={() => setIsAuthenticated(true)} />
      )}
      {isAuthenticated && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="companyEmail"
                className="block text-white text-lg mb-2"
              >
                Company Email
              </label>
              <input
                type="email"
                id="companyEmail"
                placeholder="Enter company Email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full p-4 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="companyName"
                className="block text-white text-lg mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-4 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="bg-gray-700 text-gray-200 p-5 rounded-lg shadow-inner max-h-72 overflow-y-auto mb-5">
              <p className="mb-4">Dear Hiring Manager,</p>
              <p className="mb-4">
                I am writing to express my interest in an open position at
                <span
                  id="companyNamePreview"
                  className="font-bold text-[#ff6f61]"
                >
                  {" "}
                  {companyName}
                </span>
                . Having recently completed my B.Tech in Information Technology,
                I am eager to contribute my skills and experience in full-stack
                development to your team.
              </p>
              <p className="mb-4">
                I have a strong background in web and mobile development, as
                demonstrated in my projects
                <span className="font-bold text-[#ff6f61]">
                  {" "}
                  Attendex
                </span> and{" "}
                <span className="font-bold text-[#ff6f61]"> EcoSorter</span>,
                which utilize technologies like
                <span className="font-bold text-[#ff6f61]">
                  {" "}
                  React, Node.js, TypeScript, and Postgres
                </span>
                . During my internship at{" "}
                <span className="font-bold text-[#ff6f61]"> Acowale</span>, I
                built authentication systems and optimized user interfaces,
                working with modern tools such as
                <span className="font-bold text-[#ff6f61]"> Figma, Docker</span>
                , and frameworks like
                <span className="font-bold text-[#ff6f61]"> Tailwind CSS</span>.
                I have also developed a range of applications that showcase my
                expertise in
                <span className="font-bold text-[#ff6f61]">
                  {" "}
                  React Native, Firebase,
                </span>{" "}
                and <span className="font-bold text-[#ff6f61]"> Tauri</span>.
              </p>
              <p className="mb-4">
                You can view my portfolio at
                <a
                  href="https://megacreate.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff6f61] hover:underline mr-2"
                >
                  {" "}
                  megacreate.netlify.app
                </a>
                and explore my projects on GitHub at
                <a
                  href="https://github.com/Megahedron69"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff6f61] hover:underline mr-2"
                >
                  {" "}
                  github.com/Megahedron69
                </a>
                . I look forward to discussing how I can contribute to your
                innovative projects.
              </p>
              <p className="mb-4">Thank you for considering my application.</p>
              <p>
                Sincerely,
                <br />
                Kartic Joshi
              </p>
              <div className="flex items-center bg-gray-800 text-white rounded-full py-2 px-4 mt-4 shadow-lg">
                <span role="img" aria-label="file">
                  📁
                </span>{" "}
                finalResume.pdf
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-400 to-[#ff6f61] rounded-lg shadow-lg hover:from-red-500 hover:to-pink-600"
            >
              Submit
            </button>
          </form>

          {message && <p className="mt-4 text-white">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
