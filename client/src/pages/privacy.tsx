import { useEffect } from 'react';
import { NavHeader, FONT, BLUE, PAD } from '@/components/nav-header';
import { useLang } from '@/lib/language-context';

type Section = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

const content: Record<'ru' | 'en', { eyebrow: string; title: string; intro: string; updated: string; sections: Section[] }> = {
  ru: {
    eyebrow: 'PRIMETRAFF.COM / LEGAL',
    title: 'Политика конфиденциальности',
    intro: 'Настоящая Политика объясняет, какие данные могут обрабатываться при посещении primetraff.com, для каких целей они используются и какие права доступны пользователям.',
    updated: 'Последнее обновление: 5 сентября 2026 года',
    sections: [
      {
        title: '1. Кто обрабатывает данные',
        paragraphs: [
          'Настоящая Политика применяется к сайту primetraff.com, управляемому командой PrimeTraff. По вопросам конфиденциальности можно связаться с нами через Telegram: @primetraffbot.',
          'В зависимости от применимого законодательства PrimeTraff выступает оператором персональных данных или контролёром данных.',
        ],
      },
      {
        title: '2. Какие данные мы получаем',
        items: [
          'Технические данные: IP-адрес, тип и версия браузера, операционная система, тип устройства, язык, часовой пояс и технические идентификаторы.',
          'Данные об использовании: посещённые страницы, время и продолжительность визита, переходы, клики, источник трафика и взаимодействие с элементами сайта.',
          'Данные, которые вы добровольно передаёте при обращении через Telegram или при переходе в партнёрские сервисы.',
          'Cookies и аналогичные технологии, если вы предоставили согласие там, где оно требуется.',
        ],
      },
      {
        title: '3. Цели и правовые основания',
        items: [
          'Работа, безопасность и техническое обслуживание сайта — законный интерес и необходимость предоставления сайта.',
          'Аналитика посещаемости и улучшение интерфейса — ваше согласие в ЕЭЗ, Великобритании и других юрисдикциях, где оно обязательно.',
          'Ответы на обращения и поддержка — принятие мер по вашему запросу и законный интерес.',
          'Соблюдение законодательства и защита прав — юридическая обязанность и законный интерес.',
        ],
      },
      {
        title: '4. Cookies и аналитика',
        paragraphs: [
          'Сайт использует Google Analytics и Яндекс.Метрику для оценки посещаемости и улучшения работы. Эти сервисы могут получать технические данные и сведения об использовании сайта в соответствии со своими политиками конфиденциальности.',
          'Для пользователей из ЕЭЗ и Великобритании аналитическое и рекламное хранение Google по умолчанию отключено через Consent Mode v2 и включается после согласия. Вы можете удалить cookies в настройках браузера и отозвать согласие, очистив данные сайта.',
        ],
      },
      {
        title: '5. Получатели и международная передача',
        paragraphs: [
          'Данные могут обрабатываться поставщиками аналитики, хостинга, инфраструктуры и поддержки только в объёме, необходимом для их функций. К таким поставщикам относятся Google и Яндекс.',
          'Некоторые поставщики могут обрабатывать данные за пределами вашей страны. Для пользователей ЕЭЗ передача осуществляется с использованием применимых гарантий, включая решения об адекватности и стандартные договорные положения, когда это требуется.',
        ],
      },
      {
        title: '6. Срок хранения и безопасность',
        paragraphs: [
          'Мы храним данные не дольше, чем это необходимо для указанных целей, выполнения юридических обязанностей и разрешения споров. Сроки хранения аналитических данных определяются настройками соответствующих сервисов.',
          'Применяются разумные организационные и технические меры защиты. Однако ни один способ передачи или хранения данных не обеспечивает абсолютную безопасность.',
        ],
      },
      {
        title: '7. Права пользователей ЕЭЗ и Великобритании',
        items: [
          'Получить доступ к своим данным, исправить или удалить их.',
          'Ограничить обработку или возразить против неё.',
          'Получить данные в переносимом формате, если право применимо.',
          'В любой момент отозвать согласие без влияния на законность предыдущей обработки.',
          'Подать жалобу в компетентный орган по защите данных.',
        ],
      },
      {
        title: '8. Права пользователей из России',
        paragraphs: [
          'Обработка персональных данных пользователей из Российской Федерации осуществляется с учётом применимых требований Федерального закона № 152-ФЗ «О персональных данных».',
        ],
        items: [
          'Получать сведения об обработке персональных данных.',
          'Требовать уточнения, блокирования или уничтожения неполных, устаревших, неточных либо незаконно обрабатываемых данных.',
          'Отозвать согласие и обжаловать действия оператора в Роскомнадзоре или суде.',
        ],
      },
      {
        title: '9. Права пользователей из США',
        paragraphs: [
          'В зависимости от штата проживания вам могут быть доступны права по CCPA/CPRA и другим применимым законам штатов США. PrimeTraff не продаёт персональные данные и не передаёт их для межконтекстной поведенческой рекламы в значении, установленном такими законами.',
        ],
        items: [
          'Знать категории и конкретные элементы собранных данных.',
          'Запрашивать удаление или исправление данных.',
          'Получать переносимую копию данных.',
          'Отказаться от продажи, передачи или целевой рекламы, если такая обработка применяется.',
          'Не подвергаться дискриминации за осуществление своих прав.',
        ],
      },
      {
        title: '10. Дети',
        paragraphs: [
          'Сайт предназначен для лиц старше 18 лет. Мы сознательно не собираем персональные данные детей. Если вы считаете, что ребёнок передал нам данные, свяжитесь с нами для их удаления.',
        ],
      },
      {
        title: '11. Сторонние сайты и изменения',
        paragraphs: [
          'Сайт содержит ссылки на сторонние сервисы. Их обработка данных регулируется собственными политиками, и PrimeTraff не отвечает за их содержание или практики конфиденциальности.',
          'Мы можем обновлять Политику при изменении сайта, сервисов или законодательства. Актуальная версия и дата обновления всегда публикуются на этой странице.',
        ],
      },
      {
        title: '12. Контакты',
        paragraphs: [
          'Для реализации прав или вопросов об обработке данных обратитесь в поддержку PrimeTraff: https://t.me/primetraffbot. Мы можем запросить разумное подтверждение личности перед выполнением запроса.',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'PRIMETRAFF.COM / LEGAL',
    title: 'Privacy Policy',
    intro: 'This Policy explains what data may be processed when you visit primetraff.com, why it is used, and which privacy rights are available to you.',
    updated: 'Last updated: September 5, 2026',
    sections: [
      {
        title: '1. Who processes your data',
        paragraphs: [
          'This Policy applies to primetraff.com, operated by the PrimeTraff team. Privacy questions may be submitted through Telegram at @primetraffbot.',
          'Depending on applicable law, PrimeTraff acts as the personal data operator or data controller.',
        ],
      },
      {
        title: '2. Data we receive',
        items: [
          'Technical data: IP address, browser type and version, operating system, device type, language, time zone, and technical identifiers.',
          'Usage data: pages visited, visit time and duration, navigation, clicks, traffic source, and interaction with site elements.',
          'Information you voluntarily provide when contacting us through Telegram or using linked partner services.',
          'Cookies and similar technologies where you have provided consent when required.',
        ],
      },
      {
        title: '3. Purposes and legal bases',
        items: [
          'Operating, securing, and maintaining the site — legitimate interests and the necessity of providing the site.',
          'Traffic analytics and interface improvements — your consent in the EEA, UK, and other jurisdictions where consent is required.',
          'Responding to requests and providing support — steps taken at your request and legitimate interests.',
          'Legal compliance and protection of rights — legal obligations and legitimate interests.',
        ],
      },
      {
        title: '4. Cookies and analytics',
        paragraphs: [
          'The site uses Google Analytics and Yandex Metrica to measure traffic and improve performance. These providers may receive technical and usage information under their respective privacy policies.',
          'For EEA and UK users, Google analytics and advertising storage are denied by default through Consent Mode v2 and enabled after consent. You may remove cookies through your browser and withdraw consent by clearing this site’s stored data.',
        ],
      },
      {
        title: '5. Recipients and international transfers',
        paragraphs: [
          'Data may be processed by analytics, hosting, infrastructure, and support providers only as needed to perform their services. These providers include Google and Yandex.',
          'Some providers may process information outside your country. For EEA users, transfers rely on applicable safeguards such as adequacy decisions and Standard Contractual Clauses where required.',
        ],
      },
      {
        title: '6. Retention and security',
        paragraphs: [
          'We retain data only as long as necessary for the purposes described, legal obligations, and dispute resolution. Analytics retention is governed by the settings of the relevant provider.',
          'Reasonable organizational and technical safeguards are used, but no transmission or storage method can guarantee absolute security.',
        ],
      },
      {
        title: '7. EEA and UK rights',
        items: [
          'Access, correct, or erase your personal data.',
          'Restrict or object to processing.',
          'Receive portable data where the right applies.',
          'Withdraw consent at any time without affecting prior lawful processing.',
          'Complain to the competent data protection authority.',
        ],
      },
      {
        title: '8. Rights of users in Russia',
        paragraphs: [
          'Personal data involving users in the Russian Federation is processed with regard to applicable requirements of Federal Law No. 152-FZ “On Personal Data.”',
        ],
        items: [
          'Receive information about personal data processing.',
          'Request correction, blocking, or deletion of incomplete, outdated, inaccurate, or unlawfully processed data.',
          'Withdraw consent and lodge a complaint with Roskomnadzor or a court.',
        ],
      },
      {
        title: '9. United States privacy rights',
        paragraphs: [
          'Depending on your state, you may have rights under the CCPA/CPRA and other applicable US state privacy laws. PrimeTraff does not sell personal information or share it for cross-context behavioral advertising as those terms are defined by such laws.',
        ],
        items: [
          'Know the categories and specific pieces of personal information collected.',
          'Request deletion or correction.',
          'Receive a portable copy of your data.',
          'Opt out of sale, sharing, or targeted advertising if such processing applies.',
          'Not be discriminated against for exercising privacy rights.',
        ],
      },
      {
        title: '10. Children',
        paragraphs: [
          'The site is intended for persons aged 18 or older. We do not knowingly collect personal information from children. If you believe a child provided data, contact us so it can be deleted.',
        ],
      },
      {
        title: '11. Third-party sites and changes',
        paragraphs: [
          'The site links to third-party services. Their own policies govern their data practices, and PrimeTraff is not responsible for their content or privacy practices.',
          'We may update this Policy when the site, services, or applicable laws change. The current version and revision date will always appear on this page.',
        ],
      },
      {
        title: '12. Contact',
        paragraphs: [
          'To exercise privacy rights or ask a question, contact PrimeTraff support at https://t.me/primetraffbot. We may request reasonable identity verification before completing a request.',
        ],
      },
    ],
  },
};

export default function PrivacyPage() {
  const { lang } = useLang();
  const page = content[lang];

  useEffect(() => {
    document.title = lang === 'ru'
      ? 'Политика конфиденциальности — PrimeTraff'
      : 'Privacy Policy — PrimeTraff';
  }, [lang]);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: FONT }}>
      <NavHeader activePage="privacy" />

      <main style={{ padding: `clamp(130px, 16vh, 190px) ${PAD} clamp(130px, 16vh, 180px)` }}>
        <div style={{ width: 'min(980px, 100%)', margin: '0 auto' }}>
          <header style={{ paddingBottom: 'clamp(42px, 7vh, 78px)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ color: BLUE, fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '0.28em', marginBottom: 18 }}>
              {page.eyebrow}
            </div>
            <h1 style={{
              margin: 0,
              maxWidth: 900,
              fontSize: 'clamp(22px, 4.4vw, 56px)',
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              textTransform: 'uppercase',
              fontWeight: 900,
            }}>
              {lang === 'ru'
                ? <>Политика<br />конфиденциальности</>
                : <>Privacy<br />Policy</>}
            </h1>
            <p style={{
              maxWidth: 760,
              margin: 'clamp(24px, 4vh, 40px) 0 0',
              color: 'rgba(255,255,255,0.58)',
              fontSize: 'clamp(12px, 1.05vw, 15px)',
              lineHeight: 1.8,
            }}>
              {page.intro}
            </p>
            <div style={{ marginTop: 20, color: 'rgba(255,255,255,0.3)', fontSize: 'clamp(9px, 0.8vw, 11px)', letterSpacing: '0.08em' }}>
              {page.updated}
            </div>
          </header>

          <div>
            {page.sections.map((section) => (
              <section
                key={section.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(220px, 0.75fr) minmax(0, 1.45fr)',
                  gap: 'clamp(24px, 5vw, 72px)',
                  padding: 'clamp(34px, 6vh, 62px) 0',
                  borderBottom: '1px solid rgba(255,255,255,0.09)',
                }}
                className="privacy-section"
              >
                <h2 style={{
                  margin: 0,
                  color: '#fff',
                  fontSize: 'clamp(14px, 1.4vw, 20px)',
                  lineHeight: 1.45,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                }}>
                  {section.title}
                </h2>
                <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 'clamp(11px, 1vw, 14px)', lineHeight: 1.85 }}>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} style={{ margin: '0 0 16px' }}>{paragraph}</p>
                  ))}
                  {section.items && (
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {section.items.map((item) => (
                        <li key={item} style={{ marginBottom: 12, paddingLeft: 6 }}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <p style={{ margin: '34px 0 0', color: 'rgba(255,255,255,0.28)', fontSize: 10, lineHeight: 1.7 }}>
            {lang === 'ru'
              ? 'Этот текст представляет собой общий информационный шаблон и не является юридической консультацией.'
              : 'This document is a general informational template and does not constitute legal advice.'}
          </p>
        </div>
      </main>

      <style>{`
        @media (max-width: 720px) {
          .privacy-section {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}