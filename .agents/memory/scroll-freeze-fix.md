---
name: PrimeTraff scroll freeze fix
description: Как победили зависание при скролле между секциями (3-4с задержка появления контента)
---

## Проблема
На landing, affiliates, advertisers всё зависало при скролле: текст, кнопки, картинки появлялись через 3-4 секунды. Blog не зависал.

## Корневая причина
**CSS `scroll-snap-type: y proximity`** заставляет браузер рендерить секции лениво — создаёт GPU compositor layer только когда секция входит в viewport. Это занимает 3-4 секунды на тяжёлых секциях.

## Решение — JS-based snap (как у profitov.partners)
Убран CSS snap, создан хук `client/src/hooks/usePageSnap.ts`:
- Перехватывает `wheel` и `touch` события через `addEventListener`
- Вызывает `scrollIntoView({ behavior: 'smooth' })` на нужной секции
- Все секции всегда отрисованы → зависаний нет
- Исключение: внутри `.faq-scroll` scroll работает нормально (проверка через `.closest('.faq-scroll')`)

**Why:** CSS snap = браузер решает когда рендерить. JS snap = все секции всегда в DOM, JS только перемещает viewport.

**How to apply:** Никогда не использовать `scroll-snap-type` на html/body для страниц с тяжёлым контентом. Всегда использовать JS-хук usePageSnap.

## Что убрано навсегда
- `scroll-snap-type: y proximity` из всех страниц и SHARED_STYLES
- `scroll-snap-stop: always` (было ещё раньше — главный источник полной блокировки)
- `scroll-behavior: smooth` из глобального CSS

## Что добавлено
- `client/src/hooks/usePageSnap.ts` — подключён во всех трёх страницах
- `contain: layout style` на секциях — помогает браузеру рендерить изолированно
- IntersectionObserver для паузы marquee вне viewport
- Cookie consent: `client/src/components/cookie-consent.tsx`
