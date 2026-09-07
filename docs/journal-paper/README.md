# Academic Journal Manuscript — Compilation Guide

This directory contains the journal manuscript draft for the **Safar** platform, formatted for submission to peer-reviewed computing and transportation software journals (e.g., *IEEE Transactions on Intelligent Transportation Systems* or *Journal of Systems and Software*).

---

## 📄 File Inventory

- [`JOURNAL_MANUSCRIPT.md`](file:///c:/Users/Windows/Documents/BUS/docs/journal-paper/JOURNAL_MANUSCRIPT.md): Comprehensive markdown version of the journal manuscript.
- [`JOURNAL_MANUSCRIPT.tex`](file:///c:/Users/Windows/Documents/BUS/docs/journal-paper/JOURNAL_MANUSCRIPT.tex): Complete LaTeX manuscript source.
- [`references.bib`](file:///c:/Users/Windows/Documents/BUS/docs/journal-paper/references.bib): BibTeX bibliography with full academic citations and DOIs.
- [`figures/`](file:///c:/Users/Windows/Documents/BUS/docs/journal-paper/figures/): High-resolution PNG figures and application screenshots.

---

## 🛠 Compilation Instructions

```bash
pdflatex JOURNAL_MANUSCRIPT.tex
bibtex JOURNAL_MANUSCRIPT
pdflatex JOURNAL_MANUSCRIPT.tex
pdflatex JOURNAL_MANUSCRIPT.tex
```
