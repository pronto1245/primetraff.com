---
name: PrimeTraff design prefs
description: Durable design/workflow preferences of the PrimeTraff user for landing mockups
---
- Rebrand direction: black bg + brand blue (#3b82f6 accents), reference profitov.partners (huge full-width uppercase title, spread word row, corner captions, RU/EN + burger top-right).
- **Why:** user repeatedly rejected "template" mixes of Playfair/Space Mono/Inter and freeform layouts; wants exact replicas of the reference with a single distinctive Cyrillic-capable font (Unbounded) and a token system (one font, one type scale, one letter-spacing, one edge padding).
- **How to apply:** for any further PrimeTraff mockup edits, reuse the tokens in `artifacts/mockup-sandbox/src/components/mockups/igaming-landing/DarkStudioBlue.tsx`; never invent extra sections beyond what's asked; only work in the mockup sandbox/canvas, never modify the production site code unless explicitly told.
- Deployment: production is on the user's own VPS (PM2 + nginx), user deploys manually via git pull; Replit "Start application" fails locally because ADMIN_PASSWORD secret is unset (intentional fail-fast).
- Рукописный/курсивный шрифт (Comforter и подобные) — под запретом для новых страниц: заголовки только Unbounded, схема «мелкий kicker + жирный крупный». (Блок «О нас» на главной с Comforter пока утверждён — не трогать без запроса.)
- Advertisers «НАМ ДОВЕРЯЮТ» секция: bottom padding = 140px (утверждено). Карточки отзывов должны быть выше фиксированного футера (Support/Uniqualizer). Не менять без запроса.
