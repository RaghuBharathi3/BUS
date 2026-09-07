# IEEE Conference Paper — Compilation Guide

This directory contains the academic conference paper draft for the **Safar** bus reservation platform, prepared according to the official IEEE conference paper template.

---

## 📄 File Inventory

- [`RESEARCH_PAPER.md`](file:///c:/Users/Windows/Documents/BUS/docs/research-paper/RESEARCH_PAPER.md): Markdown version of the conference research paper.
- [`RESEARCH_PAPER.tex`](file:///c:/Users/Windows/Documents/BUS/docs/research-paper/RESEARCH_PAPER.tex): Complete LaTeX source code configured with the `IEEEtran` document class.
- [`references.bib`](file:///c:/Users/Windows/Documents/BUS/docs/research-paper/references.bib): BibTeX bibliography containing all cited academic literature.
- [`figures/`](file:///c:/Users/Windows/Documents/BUS/docs/research-paper/figures/): High-resolution PNG figures (architectural diagrams and authentic project screenshots).

---

## 🛠 Compilation Instructions

To compile the LaTeX source into a publication-ready PDF:

```bash
# 1. First LaTeX pass
pdflatex RESEARCH_PAPER.tex

# 2. Compile BibTeX bibliography
bibtex RESEARCH_PAPER

# 3. Resolve cross-references and citations
pdflatex RESEARCH_PAPER.tex
pdflatex RESEARCH_PAPER.tex
```

Alternatively, upload this directory directly to **Overleaf** and select `pdfLaTeX` as the compiler.
