# **App Name**: Resume Keeper

## Core Features:

- User Authentication & Profile: Secure user login and a centralized dashboard for managing profile details including basics, about section, experience, and education.
- AI 'About' Generation: Utilize a Genkit flow (generateAbout) to dynamically create an 80-120 word 'About' paragraph and a 1-2 sentence 'short bio' based on user inputs for roles, strengths, industries, achievements, and tone. A button will trigger this tool.
- AI Responsibility Rewriting: Provide a 'Rewrite bullets' button for each job entry that invokes a Genkit flow (rewriteResponsibilities) to rephrase and condense responsibilities into exactly three professional bullet points, considering job title, company, and target role.
- Project Management: Create and manage project entries, supporting addition by URL or file upload, and allowing inclusion of images via URL links. Each project must have at least one evidence source and store its data in a database.
- AI Project Summary Generation: Employ a Genkit flow (buildProjectFromEvidence) to generate a concise summary and exactly three key bullet points for projects, utilizing extracted text from uploaded files or summaries from provided URLs.
- Publish/Preview Portfolio: Render a clean, professional, and accessible online resume/portfolio layout using all saved user data, suitable for sharing via URL.
- Data Validation & Editing: Implement front-end and back-end validation to ensure data integrity, such as exactly 3 responsibilities per job, and enable comprehensive edit/update functionality for all sections of the resume.

## Style Guidelines:

- Primary color: A sophisticated, muted purple (#8C59C0) to convey professionalism and individuality, suitable for interactive elements and key text.
- Background color: A very light, almost white lavender (#F2F0F5) to maintain a clean, expansive, and calming visual environment for focused content.
- Accent color: A vibrant, slightly deeper blue-purple (#2E2EB8) for call-to-action buttons, highlights, and important notifications, ensuring high visibility and contrast.
- Complementary accent color: (#96f2dd) to help the Resume keeper pop and standout.
- Complementary accent color: (#a8bae0) to help the Resume keeper pop and standout.
- Body and headline font: 'Inter' (sans-serif) for its modern, clean, and highly readable qualities, ensuring objective and professional presentation across all text.
- Utilize a set of simple, professional line icons that are consistent in style and accessible, reinforcing clarity and functionality without distraction.
- Employ a responsive, grid-based layout with generous whitespace to ensure optimal readability and navigation across various devices, reflecting a clean and organized professional document.
- Incorporate subtle, tasteful animations for transitions between sections, form submissions, and feedback cues, enhancing user experience without being disruptive or overbearing.