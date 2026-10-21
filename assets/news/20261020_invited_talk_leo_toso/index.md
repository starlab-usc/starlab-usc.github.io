---
title: "Leo Toso: Control-Aware Visual Representation Learning for World Models"
date: "2026-10-20"
type: Invited talk
summary: "Leo Toso (Columbia University) visited StarLab and presented Control-Aware Visual Representation Learning for World Models, exploring which information visual representations must preserve for planning and feedback control. Hosted by Stephen Tu."
---

**Speaker:** [Leo Toso](https://leotoso.github.io/), Columbia University  
**Date:** October 20, 2026  
**Time:** 2:00–3:00 p.m. Pacific Time  
**Location:** EEB 539, USC  
**Host:** Stephen Tu

#### Abstract

Visual world models promise to control physical systems directly from high-dimensional observations by learning compact latent dynamics. Their success, however, depends on a fundamental representation learning question: which information should the latent model discard, and which information must it preserve for planning and control? In this talk we explore two complementary answers.

First, we show that predictive objectives can overemphasize slowly varying visual features, such as backgrounds and distractors, that are predictable but irrelevant to control. We then propose JEPA-Bisim, which leverages bisimulation metrics to suppress nuisance variation while preserving controlled transition behavior. This improves robustness on navigation (PointMaze) and manipulation (PushT) tasks under unseen visual shifts at test-time.

Second, we show that standard next-step prediction and representation anti-collapse regularization can still discard controllable unstable modes, making latent feedback stabilization impossible despite accurate prediction and non-collapsed representations. We then introduce endpoint inverse dynamics (EP-IDM), which reconstructs action sequences from endpoint latents. For linear systems, exact action reconstruction preserves finite-horizon reachable directions, including the controllable unstable directions that are crucial for latent stabilization. This improves stabilization, locomotion, and planning, for CartPole, Walker2D, and PointMaze, respectively.

Our results formalize control-aware visual representation learning for world models: discard what control does not need, while preserving what feedback must observe.

This talk is based on two recent papers:

- [JEPA-Bisim: Learning Robust Visual Representations for Planning with Joint-Embedding Predictive World Models](https://arxiv.org/abs/2602.18639)
- [Preserving Unstable Modes Through Inverse Dynamics in JEPA World Models](https://arxiv.org/abs/2610.07540)
