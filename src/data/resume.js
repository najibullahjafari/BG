
import kankorImg from "../assets/projects/dormitory/kankor.jpg";
import apartmentImg from "../assets/projects/apartment/apartment.PNG";
import tourismImg from "../assets/projects/atp/tourism.jpeg";
import afgmapImg from "../assets/projects/awec/afgmap.PNG";
import attendanceDeviceImg from "../assets/projects/awec/attendance_device.PNG";
import attendanceImg from "../assets/projects/awec/attendance.PNG";
import logImg from "../assets/projects/awec/log.PNG";
import messengerImg from "../assets/projects/awec/messenger.PNG";
import azoqa1 from "../assets/projects/azoqa/32f443.PNG";
import azoqa2 from "../assets/projects/azoqa/azfasd.PNG";
import nui1 from "../assets/projects/nui/3f434.PNG";
import nui2 from "../assets/projects/nui/f43f34f.PNG";
import zeroo1 from "../assets/projects/zeroo/23ff23f.PNG";

export const resume = {
    name: "Najibullah Jafari",
    title: "Full-stack Engineer",
    tagline:
        "I build production-ready web applications with React, Laravel, Python, and PostgreSQL — from database design and APIs to deployment.",
    location: "Kabul, Afghanistan",
    availability: "Open to full-time, freelance, and remote work",
    email: "najib2020202020@gmail.com",
    github: "https://github.com/najibullahjafari",
    linkedin: "https://linkedin.com/in/najibullahjafari",
    twitter: "https://x.com/Najib_Jafari_",
    portfolio: "https://najibullahjafari.github.io/BG",
    stackOverflow: "https://stackoverflow.com/users/22340696/najibullah-jafari",
    CodeForces: "https://codeforces.com/profile/kucoders",
    LeetCode: "https://leetcode.com/u/najib2020202020/",
    Phone: "0793647446",
    summary: `Full-stack engineer specializing in Laravel and React. I've shipped ERP, HMS, and POS systems used by real organizations, and mentored junior developers through code review and pair programming. Comfortable owning features end to end: schema design, APIs, UI, and deployment.`,
    skills: [
        {
            id: "frontend",
            label: "Frontend",
            blurb: "Component-driven UIs with attention to responsiveness and accessibility.",
            items: ["JavaScript", "TypeScript", "React", "Redux", "Vue", "Tailwind CSS", "Bootstrap", "HTML", "CSS", "Livewire"],
        },
        {
            id: "backend",
            label: "Backend & APIs",
            blurb: "REST APIs, authentication, and business logic for data-heavy systems.",
            items: ["Laravel", "PHP", "Python", "FastAPI", "Ruby on Rails", "REST APIs"],
        },
        {
            id: "data",
            label: "Databases",
            blurb: "Schema design, queries, and migrations for relational data.",
            items: ["MySQL", "PostgreSQL"],
        },
        {
            id: "tools",
            label: "Tools & Delivery",
            blurb: "Version control, deployment, and the workflow around shipping.",
            items: ["Git", "GitHub", "Docker", "CI/CD", "cPanel", "Linux", "Postman", "Figma", "Netlify", "Google Analytics"],
        },
        {
            id: "practices",
            label: "Practices",
            blurb: "How I work with teams and approach problems.",
            items: ["Remote pair programming", "Code review", "Mentoring", "Agile methodologies", "UI & UX design"],
        },
    ],
    achievements: [
        "ICPC Afghanistan — 4th place, 2023 (43 teams)",
        "ICPC Afghanistan — 7th place, 2024 (64 teams)",
    ],
    experience: [
        {
            company: "Al Hawa Technologies",
            role: "Full-Stack Web Developer",
            period: "02/2024-06/2024",
            description: "Contributed to a CMS for the AADA organization as part of a Laravel + Vue team: built features, debugged production issues, and collaborated through Git-based workflows.",
            tech: ["Laravel", "Vue", "MySQL", "Git"],
            location: "On-site"
        },
        {
            company: "Woosat",
            role: "Full-Stack Web Developer",
            period: "06/2024-08/2024",
            description: "Worked on a point-of-sale system with Laravel and React: implemented features across the stack and debugged with Xdebug against MySQL.",
            tech: ["Laravel", "React", "MySQL", "Xdebug"],
            location: "On-site"
        },
        {
            company: "Apex Games",
            role: "Web Developer",
            period: "08/2024-08/2025",
            description: "Part-time remote developer on a globally distributed team: building React + Tailwind interfaces and Ruby features, coordinating asynchronously via GitHub and Discord.",
            tech: ["React", "Tailwind CSS", "Ruby", "Figma"],
            location: "Remote"
        },
        {
            company: "Kabul Innovation Center",
            role: "Full-stack Engineer",
            period: "02/2025-Present",
            description: "Full-stack engineer on HMS and MIS web applications: building modules with Laravel and Livewire, automating workflows, and handling deployment via cPanel.",
            tech: ["Laravel", "Livewire", "Tailwind CSS", "cPanel"],
            location: "On-site"
        },
        {
            company: "SJA Pathway",
            role: "Senior Web Developer",
            period: "05/2025-Present",
            description: "Part-time senior developer: reviewing pull requests, leading the team, creating tasks and driving delivery in a remote workflow.",
            tech: ["React", "Laravel", "GitHub"],
            location: "Remote"
        }
    ],
    projects: [
        {
            name: "Azoqa",
            role: "Full-stack Developer",
            problem: "The business needed a dedicated online storefront to list products, manage orders, and handle customer purchases without depending on third-party marketplaces.",
            description: "Built a custom e-commerce platform with product catalog, shopping cart, checkout, and order management tailored to azoqa.com.",
            tech: ["React", "Laravel"],
            period: "2025",
            live: "https://azoqa.com",
            images: [azoqa1, azoqa2]
        },
        {
            name: "NUI Academy",
            role: "Full-stack Developer",
            problem: "The academy needed a centralized platform to deliver courses, track student progress, and manage enrollments and assessments online.",
            description: "Built a learning management system with course content, student dashboards, enrollment tracking, and progress reporting for nui.academy.",
            tech: ["React", "Laravel"],
            period: "2025",
            live: "https://nui.academy",
            images: [nui1, nui2]
        },
        {
            name: "ZEROO POS",
            role: "Full-stack Developer",
            problem: "Small retailers tracked sales and inventory through manual notes or fragmented tools, leading to errors, stock mismatches, and slow checkout.",
            description: "Built a point-of-sale system with product scanning, sales tracking, receipt management, and inventory control for ZEROO.",
            tech: ["React", "Laravel"],
            period: "2025",
            images: [zeroo1]
        },
        {
            name: "Afghanistan Women Educational Center ERP",
            role: "Full-stack Engineer",
            problem: "AWEC needed a centralized MIS to replace manual HR, recruitment, and attendance processes across multiple provinces.",
            description: "Built the HR, M&E, recruitment, and attendance modules of a comprehensive ERP, including integration between provincial attendance devices and the central system.",
            highlights: [
                "HR, M&E, and recruitment modules with role-based access",
                "Attendance-device integration syncing provincial data to the central system",
                "Deployed and maintained in production via cPanel",
            ],
            tech: ["Laravel", "Livewire", "Tailwind CSS", "MySQL", "cPanel"],
            period: "04/2025 – Present",
            images: [afgmapImg, attendanceDeviceImg, attendanceImg, logImg, messengerImg]
        },
        {
            name: "Kabul University Dormitory HMS",
            role: "Full-stack Developer",
            problem: "Dormitory placement for Kankor students was handled manually across faculties and departments.",
            description: "A housing management system that automates dormitory selection for Kankor students, with dashboards for faculties and departments.",
            tech: ["Laravel", "Livewire", "Bootstrap 5", "MySQL"],
            period: "04/2021 – 02/2024",
            images: [kankorImg]
        },
        {
            name: "Afghanistan Tourism Portal",
            role: "Full-stack Developer",
            problem: "Tourists lacked a single place to discover destinations and book hotels and transport.",
            description: "A platform covering sightseeing destinations plus car and hotel booking, with dashboards for hotels, drivers, tourists, and admins.",
            tech: ["React", "Inertia.js", "Laravel", "Tailwind CSS"],
            period: "04/2021 – 02/2024",
            images: [tourismImg]
        },
        {
            name: "Apartment Rental System",
            role: "Full-stack Developer",
            problem: "Landlords and tenants managed rentals, payments, and requests through manual paperwork.",
            description: "A rental management system automating the apartment rental lifecycle, with dashboards for landlords and tenants.",
            tech: ["Laravel", "Livewire", "Bootstrap 5", "MySQL"],
            period: "04/2025 – Present",
            images: [apartmentImg]
        }
    ],
    websites: [
        {
            name: "Wind Cloud",
            description: "Company site for an energy resource management business.",
            url: "https://wce.af"
        },
        {
            name: "Kaynat — Precision in Motion",
            description: "Company site for a GPS tracking and fleet management provider.",
            url: "https://kaynat.af"
        },
        {
            name: "Math Magician",
            description: "Utility app: live exchange rates, barcode generation, quotes, calculator, and nutrition data.",
            url: "https://mathnajib.netlify.app"
        },
        {
            name: "Microverse Portfolio",
            description: "Earlier personal portfolio built during the Microverse program.",
            url: "https://najibullahjafari.github.io/Myportfolio/"
        },
        {
            name: "To-do List",
            description: "Task manager built with vanilla JavaScript and webpack.",
            url: "https://gleaming-rabanadas-7c9e4b.netlify.app/"
        },
        {
            name: "My Crypto",
            description: "Cryptocurrency price tracker consuming a live market API.",
            url: "https://tiny-sfogliatella-1f3791.netlify.app/"
        },
        {
            name: "HDSOC",
            description: "Organization website for HDSOC Afghanistan.",
            url: "https://hdsoc.af"
        },
        {
            name: "ACIM",
            description: "Organization website for ACIM Afghanistan.",
            url: "https://acim.af"
        },
        {
            name: "Tax House",
            description: "Website for Tax House Afghanistan.",
            url: "https://taxhouse.af"
        },
    ],
    mentoring: {
        organization: "Microverse",
        role: "Mentor (Volunteer)",
        period: "04/2023-01/2024",
        description: "Mentored junior web developers in weekly sessions via Slack and Zoom: code reviews, technical guidance, and career advice throughout the program."
    },
    education: [
        {
            institution: "Kabul University",
            period: "11/2020 – 11/2024",
            description: "BSc Computer Science (Information Systems). Coursework: full-stack web development, databases, HCI, BPMN, Flutter, networking, system administration. GPA 3.5."
        },
        {
            institution: "Microverse",
            period: "04/2023 – 08/2024",
            description: "Full-time remote software development program: 1300+ hours of algorithms, data structures, and full-stack projects with JavaScript, React, Redux, and Ruby on Rails — using remote pair programming, git-flow, and daily standups."
        },
    ]
};
