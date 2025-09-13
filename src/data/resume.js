
import kankorImg from "../assets/projects/dormitory/kankor.jpg";
import apartmentImg from "../assets/projects/apartment/apartment.PNG";
import tourismImg from "../assets/projects/atp/tourism.jpeg";
import afgmapImg from "../assets/projects/awec/afgmap.PNG";
import attendanceDeviceImg from "../assets/projects/awec/attendance_device.PNG";
import attendanceImg from "../assets/projects/awec/attendance.PNG";
import logImg from "../assets/projects/awec/log.PNG";
import messengerImg from "../assets/projects/awec/messenger.PNG";
import { stack } from "three/tsl";

export const resume = {
    name: "Najibullah Jafari",
    title: "Full-stack web developer",
    email: "najib2020202020@gmail.com",
    github: "https://github.com/najibullahjafari",
    linkedin: "https://linkedin.com/in/najibullahjafari",
    twitter: "https://x.com/Najib_Jafari_",
    portfolio: "https://najibullahjafari.github.io/BG",
    stackOverflow: "https://stackoverflow.com/users/22340696/najibullah-jafari",
    CodeForces: "https://codeforces.com/profile/kucoders",
    LeetCode: "https://leetcode.com/u/najib2020202020/",
    Phone: "0793647446",
    summary: `Certified Full-stack web developer skilled in crafting innovative programs for organizational efficiency. Proficient in technology, specializing in Laravel and React for reliable and user-friendly systems. Proven mentor, adept at motivating and managing a team of 5+ developers for efficient software development. Confident communicator and strategic thinker, excelling in creating tailored solutions that emphasize core competencies and drive overall success.`,
    skills: {
        frontend: ["JavaScript", "React", "Redux", "Tailwind", "HTML5", "CSS3", "Bootstrap", "Vue js"],
        backend: ["Python", "PHP", "Ruby on Rails", "Mysql", "PostgreSQL", "Laravel", "RESTful APIs", "Livewire"],
        tools: ["Git", "GitHub", "Netlify", "Render", "Mobile/Responsive Development", "Chrome Dev Tools", "C Panel", "Postman", "CI/CD", "Google Analytics"],
        professional: ["Remote Pair-Programming", "Teamwork", "UI & UX Design", "Mentoring", "Critical Thinking", "Agile methodologies"],
        problemSolving: ["ICPC 4th at 2023 (43 teams)", "ICPC 7th at 2024 (64 teams)"]
    },
    experience: [
        {
            company: "Al Hawa Technologies",
            role: "Full-Stack Web Developer",
            period: "02/2024-06/2024",
            description: "Full-stack Developer with Laravel and Vue js. Contributed to CMS for AADA org. Used HeidiSQL, SourceTree, Google Meet, Git, GitHub, VS Code, Debugger.",
            location: "On site"
        },
        {
            company: "Woosat",
            role: "Full-Stack Web Developer",
            period: "06/2024-08/2024",
            description: " Full-stack Developer with Laravel and React. Contributed to POS system. Used Wamp server, Mysql, Php Xdebug, teamwork, software debugging.",
            location: "On site"
        },
        {
            company: "Apex Games",
            role: "Web Developer",
            period: "08/2024-Present",
            description: "Part-time remote Web Developer collaborating globally. Used Discord, GitHub, React, Tailwind, Ruby, Figma, webpack, etc.",
            location: "Remote"
        },
        {
            company: "Kabul Innovation Center",
            role: "Full-stack Engineer",
            period: "02/2025-Present",
            description: "Full-stack Engineer for web applications (hms, mis, online servers, web automation, etc.). Used Cpanel, GitHub, Livewire, Tailwind, Laravel, webpack, etc.",
            location: "On site"
        }
    ],
    projects: [
        {
            name: "Kabul University Dormitory",
            description: "Intuitive HMS system for automating Kankor student dormitory selection. Full dashboard for faculties and departments.",
            tech: ["Laravel Livewire", "GitHub", "Agile", "Bootstrap5", "Remote Collaboration", "Team working"],
            period: "04/2021 – 02/2024",
            images: [kankorImg]
        },
        {
            name: "Apartment Rental System",
            description: "Intuitive HMS system for automating apartment rental processes. Full dashboard for landlords and tenants.",
            tech: ["Laravel Livewire", "GitHub", "Agile", "Bootstrap5", "one site Collaboration", "Team working"],
            period: "04/2025 – 07/2026",
            images: [apartmentImg]
        },
        {
            name: "Afghanistan Tourism Portal",
            description: "A comprehensive platform for sightseeing places, car/hotel booking for tourists. Full dashboard for hotels, cars, tourists, admin.",
            tech: ["React js", "Inertia js", "Laravel", "GitHub", "Agile", "Tailwind css", "Remote Collaboration", "Team working"],
            period: "04/2021 – 02/2024",
            images: [tourismImg]
        },
        {
            name: "Afghanistan Women Educational Center ERP",
            description: "It is a comprehensive MIS system and I made the HR, M&E, Recruitment, Attendance, Connection between province attendances and system and more.",
            tech: ["Laravel", "Livewire", "GitHub", "Agile", "Tailwind CSS", "Cpanel & deployment", "On site collaboration", "Team working", "MySQL", "HeidiSQL", "PhpMyAdmin"],
            period: "04/2025 – Present",
            images: [
                afgmapImg,
                attendanceDeviceImg,
                attendanceImg,
                logImg,
                messengerImg,
            ]
        }
    ],
    websites: [
        {
            name: "Wind Cloud",
            description: "A company for managing energy resources and providing innovative solutions.",
            url: "https://wce.af"
        },
        {
            name: "Kaynat Precision in Motion",
            description: "A gps tracking and fleet management company.",
            url: "https://kaynat.af"
        },
        {
            name: "Math Magician",
            description: "A useful tool for updated exchange rate, generating barcode, new quotes, calculator and nutrition.",
            url: "https://mathnajib.netlify.app"
        },
        {
            name: "Microverse Portfolio Project",
            description: "An eye catching web page for my personal portfolio.",
            url: "https://najibullahjafari.github.io/Myportfolio/"
        },
        {
            name: "To do list",
            description: "A simple to do list app to manage your tasks effectively.",
            url: "https://gleaming-rabanadas-7c9e4b.netlify.app/"
        },
        {
            name: "My Crypto",
            description: "A simple crypto tracker app to manage your cryptocurrency portfolio effectively and update prices.",
            url: "https://tiny-sfogliatella-1f3791.netlify.app/"
        },
        {
            name: "And more... you can check my github profile for more projects",
            description: "A collection of various projects showcasing my skills and expertise.",
            url: "https://github.com/najibullahjafari"
        },
        // Add more { name, description, url } entries here.
    ],
    mentoring: {
        organization: "Microverse",
        role: "Mentor (Volunteer)",
        period: "04/2023-01/2024",
        description: "Mentored 3+ junior web developers weekly via Slack/Zoom. Provided code reviews, strategic improvements, advice for motivation. Improved code quality by 15%, performance by 20%."
    },
    education: [
        {
            institution: "KABUL UNIVERSITY",
            period: "11/2020 – 11/2024",
            description: "Bachelor, Computer Science (Information Systems). Full-Stack Web Development, Database, HCI, BPMN, Flutter, Network, System Administration. GPA: 3.5"
        },
        {
            institution: "University of People",
            period: "10/2025 – present",
            description: "Pursuing Bachelor of Science in Computer Science. Courses include Data Structures and Algorithms, Operating Systems, Database Systems, Software Engineering, Web Development, and more."
        },
        {
            institution: "MICROVERSE",
            period: "04/2023 – 8/2024",
            description: "Remote Full Stack Web Development Program, Full-Time. 1300+ hours mastering algorithms, data structures, full-stack development. Projects with JavaScript, React, Redux, Ruby on Rails. Remote pair programming, git-flow, daily standups."
        },
        {
            institution: "EDX ORGANIZATION",
            period: "08/2025 – Present",
            description: "Pursuing Professional Certificate in Computer Science for Artificial Intelligence. Courses include Python, SQL, Data Structures, Algorithms, Machine Learning, and AI concepts."
        },

    ]
};
