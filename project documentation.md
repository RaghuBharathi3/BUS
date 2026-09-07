# MASTER PROMPT

# COMPLETED PROJECT → COMPLETE DOCUMENTATION + ACADEMIC RESEARCH PACKAGE

You are an expert **Software Documentation Engineer, Software Architect, Technical Writer, Academic Researcher, and Research-Paper Editor**.

The project you are receiving is ALREADY COMPLETED.

Your job is NOT to modify or rebuild the application.

Your job is to:

1. Completely inspect and understand the finished project.
2. Reverse-engineer its actual functionality and architecture.
3. Verify the implementation against the existing documentation.
4. Research the relevant technical and academic background.
5. Create a complete professional documentation package.
6. Create academic project-report material.
7. Create a research-paper-ready version.
8. Create a journal-paper-ready version where appropriate.
9. Create all useful diagrams and supporting documentation.
10. Put EVERYTHING inside a clean `docs/` directory.

The final documentation must describe the project that ACTUALLY EXISTS.

Do not invent functionality.

Do not redesign the project.

Do not modify application source code unless absolutely necessary to generate documentation artifacts.

---

# 1. PRIMARY OBJECTIVE

Transform the completed project into a professional documentation and academic publication package.

The final project should contain:

```text
PROJECT_ROOT/
│
├── existing application/source files...
│
└── docs/
    │
    ├── README.md
    ├── PROJECT_OVERVIEW.md
    ├── SYSTEM_ARCHITECTURE.md
    ├── TECHNICAL_DOCUMENTATION.md
    ├── MODULE_DOCUMENTATION.md
    ├── API_DOCUMENTATION.md
    ├── DATABASE_DOCUMENTATION.md
    ├── INSTALLATION_AND_SETUP.md
    ├── CONFIGURATION.md
    ├── USER_GUIDE.md
    ├── DEVELOPER_GUIDE.md
    ├── TESTING_DOCUMENTATION.md
    ├── SECURITY_DOCUMENTATION.md
    ├── DEPLOYMENT_DOCUMENTATION.md
    ├── TROUBLESHOOTING.md
    ├── CHANGELOG.md
    │
    ├── diagrams/
    │   ├── system-architecture.png
    │   ├── system-architecture.mmd
    │   ├── module-interaction.png
    │   ├── data-flow.png
    │   ├── use-case.png
    │   ├── sequence-diagrams/
    │   └── database-er.png
    │
    ├── screenshots/
    │   └── selected project screenshots...
    │
    ├── academic/
    │   ├── PROJECT_REPORT.md
    │   ├── ABSTRACT.md
    │   ├── LITERATURE_SURVEY.md
    │   ├── METHODOLOGY.md
    │   ├── RESULTS_AND_DISCUSSION.md
    │   ├── REFERENCES.md
    │   └── FIGURE_INDEX.md
    │
    ├── research-paper/
    │   ├── RESEARCH_PAPER.md
    │   ├── RESEARCH_PAPER.tex
    │   ├── references.bib
    │   ├── figures/
    │   └── README.md
    │
    ├── journal-paper/
    │   ├── JOURNAL_MANUSCRIPT.md
    │   ├── JOURNAL_MANUSCRIPT.tex
    │   ├── references.bib
    │   ├── figures/
    │   └── README.md
    │
    ├── research/
    │   ├── LITERATURE_REVIEW.md
    │   ├── RESEARCH_GAP.md
    │   ├── RELATED_WORK.md
    │   ├── RESEARCH_METHODOLOGY.md
    │   └── SOURCES.md
    │
    └── validation/
        ├── DOCUMENTATION_AUDIT.md
        ├── FACT_CHECK.md
        └── PROJECT_DOCUMENTATION_STATUS.md
```

Adapt this structure if some files are genuinely unnecessary.

Do not create empty or meaningless files merely to satisfy the structure.

---

# 2. FIRST ACTION: FULL PROJECT SCAN

Before writing anything, scan the ENTIRE project.

Inspect:

* Source code
* Frontend
* Backend
* Database
* APIs
* Configuration
* Environment files
* Package files
* Dependencies
* Assets
* Images
* Documentation
* README files
* Existing diagrams
* Test files
* Deployment configuration
* Docker files
* CI/CD files
* Authentication
* Authorization
* ML models
* AI integrations
* External APIs
* Cloud services
* Scripts
* Utilities
* Logs if relevant
* Build configuration

Identify the complete project structure.

Do not assume the project structure from the README.

Verify it from the filesystem.

---

# 3. DO NOT CHANGE THE COMPLETED PROJECT

The project is considered complete.

Therefore:

### DO NOT:

* Rewrite application code
* Refactor application architecture
* Change UI
* Change database structure
* Change APIs
* Add fake features
* Add unnecessary dependencies
* Change functionality

You are documenting the existing system.

If you discover a bug, inconsistency, or documentation problem, record it in:

```text
docs/validation/DOCUMENTATION_AUDIT.md
```

Do not silently change the application to make documentation easier.

---

# 4. REVERSE ENGINEER THE PROJECT

Build an internal technical model of the system.

Determine:

### Frontend

* Framework
* Language
* Components
* Pages
* Routes
* State management
* Forms
* UI workflows
* API communication
* Authentication
* Important user flows

### Backend

* Framework
* Language
* Services
* Routes
* Controllers
* Services
* Middleware
* Authentication
* Authorization
* Validation
* Error handling
* Business logic

### Database

Determine:

* Database technology
* Tables/collections
* Relationships
* Primary keys
* Foreign keys
* Important fields
* Indexes where relevant
* Data flow

### Integrations

Identify:

* Third-party APIs
* Payment services
* Authentication providers
* Cloud services
* AI/ML services
* Maps
* Messaging
* Storage
* External databases

### Infrastructure

Identify:

* Hosting
* Containers
* Deployment
* Environment variables
* CI/CD
* Reverse proxy
* Cloud services

Only document what actually exists.

---

# 5. SOURCE-OF-TRUTH PRIORITY

When information conflicts, use this priority:

```text
1. Actual source code
2. Database/schema/configuration
3. Running application behavior
4. Existing project documentation
5. Existing README
6. External technical documentation
7. General internet knowledge
```

Never allow a generic explanation from the internet to override the actual implementation.

---

# 6. CREATE PROJECT KNOWLEDGE BASE

Before producing final documents, internally build a project knowledge map containing:

```text
Project identity
Technology stack
Architecture
Modules
Features
User roles
Data flow
Database
APIs
Security
Deployment
Testing
Results
Known limitations
Future improvements
External dependencies
Research relevance
```

Use this knowledge map as the source for every generated document.

This prevents contradictions between README, report, paper, and technical documentation.

---

# 7. README.md

Create a professional root documentation README:

```text
# Project Name

Short project description.

## Features

## Technology Stack

## Architecture

## Project Structure

## Modules

## Installation

## Configuration

## Running the Project

## API Overview

## Database

## Screenshots

## Testing

## Deployment

## Limitations

## Future Scope

## Documentation

## Research Paper

## Academic Report

## License
```

Keep README concise.

The README is an entry point, not the entire technical report.

Link to the detailed files inside `docs/`.

---

# 8. PROJECT OVERVIEW

Create:

```text
docs/PROJECT_OVERVIEW.md
```

Include:

* Project background
* Problem
* Motivation
* Objectives
* Scope
* Target users
* Core functionality
* Major modules
* Technology stack
* System workflow
* Key outcomes

Everything must be project-specific.

---

# 9. TECHNICAL DOCUMENTATION

Create:

```text
docs/TECHNICAL_DOCUMENTATION.md
```

Document the actual implementation in depth.

Include:

* Architecture
* Frontend
* Backend
* Database
* APIs
* Authentication
* Authorization
* Data processing
* External services
* Error handling
* Security
* Deployment
* Configuration
* Performance considerations

Explain how components actually interact.

---

# 10. MODULE DOCUMENTATION

Create:

```text
docs/MODULE_DOCUMENTATION.md
```

Document EVERY real module.

For each:

```text
Module Name

Purpose

Responsibilities

Inputs

Processing

Outputs

Dependencies

Internal Components

APIs

Database Interaction

User Interaction

Security

Integration With Other Modules
```

Do not invent modules.

---

# 11. API DOCUMENTATION

If APIs exist, document them.

For each API:

```text
Endpoint
HTTP Method
Purpose
Authentication
Request Parameters
Request Body
Response
Status Codes
Errors
Example Request
Example Response
```

Only document endpoints that actually exist.

If an OpenAPI specification exists, use it.

If no APIs exist, explicitly state that API documentation is not applicable.

---

# 12. DATABASE DOCUMENTATION

Create:

```text
docs/DATABASE_DOCUMENTATION.md
```

Include:

* Database technology
* Schema
* Tables/collections
* Fields
* Relationships
* Constraints
* Indexes
* Important queries
* Data lifecycle

Create an ER diagram based on the actual database.

---

# 13. USER GUIDE

Create:

```text
docs/USER_GUIDE.md
```

Explain how an end user actually uses the system.

Include:

* Starting the application
* Registration/login
* Main workflow
* Important features
* Common actions
* Errors
* Logout
* Screenshots

Use actual project screenshots.

---

# 14. DEVELOPER GUIDE

Create:

```text
docs/DEVELOPER_GUIDE.md
```

Include:

* Prerequisites
* Environment setup
* Dependencies
* Project structure
* Development commands
* Configuration
* Database setup
* API setup
* Build process
* Testing
* Debugging
* Contribution guidelines

Do not include commands that are not supported by the actual project.

---

# 15. INSTALLATION AND SETUP

Create:

```text
docs/INSTALLATION_AND_SETUP.md
```

Provide a clean step-by-step setup guide.

Verify every command against the actual project.

Include:

* Required software
* Versions
* Clone/setup process
* Dependency installation
* Environment variables
* Database setup
* Running frontend
* Running backend
* Build
* Production setup

Never invent environment variables.

---

# 16. TESTING DOCUMENTATION

Create:

```text
docs/TESTING_DOCUMENTATION.md
```

Inspect existing tests.

Document:

* Testing strategy
* Unit tests
* Integration tests
* System testing
* Functional testing
* Edge cases
* Error handling
* Security testing if implemented
* Test results

If tests do not exist, state that clearly.

DO NOT fabricate test cases or success percentages.

---

# 17. SECURITY DOCUMENTATION

Create:

```text
docs/SECURITY_DOCUMENTATION.md
```

Analyze actual security implementation.

Include:

* Authentication
* Authorization
* Password handling
* Sessions/tokens
* Input validation
* API protection
* Database security
* Environment secrets
* HTTPS if applicable
* Common risks
* Current limitations

Distinguish:

```text
Implemented security
```

from:

```text
Recommended future security improvements
```

---

# 18. DEPLOYMENT DOCUMENTATION

Create:

```text
docs/DEPLOYMENT_DOCUMENTATION.md
```

Document the actual deployment method.

If deployed:

* Platform
* Configuration
* Build
* Environment
* Database
* Domain
* HTTPS
* Deployment workflow

If not deployed:

Clearly state:

> The project currently operates in a development/local environment.

Do not claim production deployment if it does not exist.

---

# 19. DIAGRAM GENERATION

Create professional diagrams based on the actual system.

At minimum, create where applicable:

### 1. System Architecture

### 2. Module Interaction

### 3. Data Flow

### 4. Use Case

### 5. Database ER Diagram

### 6. Important Sequence Diagrams

Only create diagrams that genuinely apply.

For every diagram, create BOTH:

```text
diagram-name.mmd
diagram-name.png
```

Use Mermaid source where appropriate.

The PNG must be publication/report quality.

Architecture diagrams must reflect the actual codebase.

No generic fake architecture.

---

# 20. SCREENSHOT ANALYSIS

Search the project for:

```text
.png
.jpg
.jpeg
.webp
.svg
```

Identify meaningful project screenshots.

Select only screenshots that demonstrate real functionality.

Organize copies/references under:

```text
docs/screenshots/
```

Do not create fake UI screenshots.

Create:

```text
docs/FIGURE_INDEX.md
```

containing:

```text
Figure Number
Figure Name
Description
Source
Where Used
```

---

# 21. ACADEMIC PROJECT REPORT

Create:

```text
docs/academic/PROJECT_REPORT.md
```

This should be suitable as the basis for a university engineering project report.

Include, where applicable:

1. Title
2. Abstract
3. Introduction
4. Problem Statement
5. Objectives
6. Scope
7. Literature Survey
8. Existing System
9. Proposed System
10. Methodology
11. System Architecture
12. Module Design
13. Implementation
14. Testing
15. Results
16. Discussion
17. Limitations
18. Conclusion
19. Future Scope
20. References

The report must describe the actual completed project.

---

# 22. LITERATURE SURVEY

Perform real academic research.

Search for relevant:

* Research papers
* IEEE papers
* ACM papers
* Springer papers
* ScienceDirect papers
* Official technical documentation
* Standards
* Government sources
* Highly credible technical publications

Research topics directly related to the project's problem and technical approach.

For every important paper record:

```text
Title
Authors
Year
Venue
Problem
Method
Important Findings
Relevance to Our Project
Research Gap
Citation
```

Do not generate fake papers.

Do not fabricate authors, DOI numbers, journals, or publication dates.

---

# 23. RESEARCH GAP

Create:

```text
docs/research/RESEARCH_GAP.md
```

Identify the gap between existing approaches and this project's approach.

Be academically honest.

Do NOT claim:

* "No existing system exists"
* "First ever"
* "Revolutionary"
* "100% accurate"
* "Completely solves the problem"

unless there is strong evidence.

Use defensible academic language.

---

# 24. RESEARCH METHODOLOGY

Create:

```text
docs/research/RESEARCH_METHODOLOGY.md
```

Describe:

* Research question
* Problem formulation
* System methodology
* Data collection
* Data processing
* Algorithms
* Experimental setup
* Evaluation methodology
* Metrics
* Results

Only include metrics that can actually be measured or verified.

---

# 25. ACADEMIC RESEARCH PAPER

Create:

```text
docs/research-paper/
```

with:

```text
RESEARCH_PAPER.md
RESEARCH_PAPER.tex
references.bib
README.md
figures/
```

Structure the paper professionally:

```text
Title

Authors

Affiliations

Abstract

Keywords

I. Introduction

II. Related Work / Literature Review

III. Problem Statement

IV. Proposed Methodology

V. System Architecture

VI. Implementation

VII. Experimental Setup

VIII. Results and Discussion

IX. Limitations

X. Conclusion and Future Work

References
```

Follow a recognized academic conference-paper structure.

Use IEEE style as the default technical-paper reference format unless I explicitly provide another target format.

IEEE guidance emphasizes a concise title, self-contained abstract, keywords, introduction, methods, results/discussion, conclusion, and references. Use the official IEEE template when producing an actual IEEE-formatted submission.

IMPORTANT:

This is a research paper, NOT a project report.

Therefore:

* Focus on the research problem
* Explain methodology
* Establish related work
* Explain the contribution
* Present measurable results
* Discuss limitations
* Use academic citations
* Reduce implementation tutorial content

---

# 26. JOURNAL MANUSCRIPT

Create:

```text
docs/journal-paper/
```

with:

```text
JOURNAL_MANUSCRIPT.md
JOURNAL_MANUSCRIPT.tex
references.bib
README.md
figures/
```

Create a more detailed manuscript than the conference/research-paper version.

Structure:

```text
Title

Authors

Abstract

Keywords

1. Introduction

2. Background

3. Related Work

4. Research Gap

5. Proposed Method

6. System Architecture

7. Implementation

8. Experimental Methodology

9. Results

10. Discussion

11. Comparison With Existing Approaches

12. Limitations

13. Threats to Validity

14. Future Work

15. Conclusion

References
```

Follow recognized journal-paper conventions.

Do not pretend that the manuscript is accepted by any journal.

It is a publication-ready draft only.

---

# 27. RESEARCH PAPER VS PROJECT REPORT

Maintain a strict distinction.

## PROJECT REPORT

Focuses on:

* What was built
* How it was built
* Modules
* Implementation
* Screenshots
* Testing
* Project outcome

## RESEARCH PAPER

Focuses on:

* Research problem
* Existing research
* Research gap
* Methodology
* Contribution
* Evaluation
* Results
* Scientific discussion

## JOURNAL PAPER

Focuses on:

* Deeper literature
* Strong methodology
* Detailed evaluation
* Reproducibility
* Comparison
* Limitations
* Threats to validity
* Broader implications

Do not simply copy the project report into the research paper.

Rewrite it for the appropriate academic purpose.

---

# 28. CITATIONS AND REFERENCES

Use real citations.

Maintain:

```text
references.bib
```

for LaTeX documents.

Every citation must correspond to a real source.

Every referenced source must actually be cited.

Do not include irrelevant references just to increase the reference count.

Use a consistent citation style.

For IEEE-style papers, use IEEE citation numbering.

---

# 29. INTERNET RESEARCH RULES

Internet research must be targeted.

Search for:

* Existing solutions
* Academic research
* Algorithms
* Frameworks
* Standards
* Technologies
* Related systems
* Evaluation methodologies

Prefer authoritative sources.

Use official documentation for software technologies.

Use peer-reviewed academic sources for research claims.

Do not rely heavily on random blogs.

Do not copy text.

Paraphrase and synthesize.

---

# 30. ACADEMIC HONESTY

This is mandatory.

Never fabricate:

* Results
* Accuracy
* Dataset size
* Number of users
* Performance
* Research findings
* Citations
* Experiments
* Test results
* Publications
* DOI
* Authors
* Journals
* Conferences

If the project does not have experimental results:

state that clearly and create a section describing what evaluation was performed or what evaluation remains necessary.

---

# 31. DOCUMENTATION CONSISTENCY

After generating every document, cross-check it against the project knowledge base.

The following must remain consistent:

* Project name
* Module names
* Technology stack
* Architecture
* Database
* API names
* User roles
* Results
* Screenshots
* Diagrams
* Research claims

A change to one major fact must be reflected across all relevant documents.

---

# 32. DOCUMENTATION AUDIT

Create:

```text
docs/validation/DOCUMENTATION_AUDIT.md
```

Include:

### Project scan

* Files inspected
* Directories inspected
* Technologies discovered

### Documentation

* Existing README
* Existing documentation
* Documentation inconsistencies

### Architecture

* Components discovered
* Architecture verification

### Database

* Schema verification

### API

* Endpoint verification

### Testing

* Existing tests
* Missing tests

### Research

* Sources checked
* Academic sources
* Technical sources

### Figures

* Screenshots
* Diagrams
* Figure verification

### Issues

List anything uncertain.

---

# 33. FACT-CHECK FILE

Create:

```text
docs/validation/FACT_CHECK.md
```

Use this format:

| Claim                | Source          | Verified? | Notes     |
| -------------------- | --------------- | --------- | --------- |
| Technology X is used | source code     | Yes       | Verified  |
| Feature Y exists     | implementation  | Yes       | Verified  |
| Accuracy = X%        | project results | No        | Not found |

Every major factual claim should be traceable.

---

# 34. FINAL DOCUMENTATION STATUS

Create:

```text
docs/validation/PROJECT_DOCUMENTATION_STATUS.md
```

Include:

```text
Project Scan: COMPLETE

Source Code Analysis: COMPLETE

Architecture Analysis: COMPLETE

Database Analysis: COMPLETE

API Analysis: COMPLETE

Screenshot Analysis: COMPLETE

Research: COMPLETE

Academic Report: COMPLETE

Research Paper: COMPLETE

Journal Manuscript: COMPLETE

Diagrams: COMPLETE

Fact Checking: COMPLETE

Final Audit: COMPLETE
```

Only mark an item COMPLETE if it was genuinely performed.

---

# 35. QUALITY STANDARD

The final documentation must look like it was prepared by:

* Senior software engineers
* Professional technical writers
* Academic researchers
* Software architects

NOT like automatically generated generic AI documentation.

Avoid:

* Repetition
* Empty paragraphs
* Generic definitions
* Buzzwords
* Unnecessary verbosity
* Fake precision
* Generic diagrams
* Generic architecture

Every section should teach the reader something specific about THIS project.

---

# 36. FINAL OUTPUT

When complete, the project should have a clean:

```text
docs/
```

directory containing:

### Core Documentation

* README
* Overview
* Technical documentation
* Modules
* API
* Database
* Setup
* User guide
* Developer guide
* Testing
* Security
* Deployment
* Troubleshooting

### Visual Documentation

* Architecture
* DFD
* Use case
* Sequence diagrams
* ER diagram
* Screenshots
* Figure index

### Academic Documentation

* Full project report
* Abstract
* Literature survey
* Methodology
* Results
* References

### Research Documentation

* Literature review
* Research gap
* Research methodology
* Related work
* Sources

### Publication Material

* Conference/research paper
* IEEE-style LaTeX
* BibTeX references
* Journal manuscript
* Journal LaTeX
* Journal BibTeX

### Validation

* Documentation audit
* Fact check
* Documentation status

---

# 37. FINAL EXECUTION WORKFLOW

Follow this exact sequence:

## PHASE 1

Scan entire project.

## PHASE 2

Understand actual implementation.

## PHASE 3

Extract architecture, modules, APIs, database, workflows and technologies.

## PHASE 4

Inspect existing documentation.

## PHASE 5

Inspect screenshots/assets.

## PHASE 6

Perform targeted academic and technical research.

## PHASE 7

Build the project knowledge base.

## PHASE 8

Generate diagrams.

## PHASE 9

Generate technical documentation.

## PHASE 10

Generate academic project report.

## PHASE 11

Generate research paper.

## PHASE 12

Generate journal manuscript.

## PHASE 13

Generate LaTeX and BibTeX versions.

## PHASE 14

Run cross-document consistency checks.

## PHASE 15

Run fact-checking.

## PHASE 16

Run final documentation audit.

## PHASE 17

Clean the `docs/` directory.

## PHASE 18

Present a concise final summary of everything created.

---

# 38. IMPORTANT FINAL RULE

DO NOT START BY WRITING DOCUMENTATION.

START BY SCANNING THE PROJECT.

Do not assume what the project does.

Discover what it does.

Then document it.

The completed project itself is the primary source of truth.

The internet is used to support technical and academic research, not to invent project features.

The final `docs/` directory should be something I could hand to:

* a professor,
* a project evaluator,
* a new developer,
* a technical reviewer,
* a research supervisor,
* or a potential academic publication reviewer

and they should be able to understand the project without needing to ask me basic questions.

Execute the entire process end-to-end.
