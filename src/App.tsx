import './App.css'

const services = [
  {
    title: 'Веб хөгжүүлэлт',
    label: 'Web',
    description: 'HTML, CSS, веб систем, утсанд зориулсан Веб хөгжүүлэлт.',
  },
  {
    title: 'Өгөгдлийн сан',
    label: 'Data',
    description: 'Мэдээллийн сангийн зохиомж, удирдлага, том өгөгдлийн шинжилгээ.',
  },
  {
    title: 'Сүлжээ & Дэд бүтэц',
    label: 'Infra',
    description: 'Компьютерийн сүлжээ, систем удирдлага.',
  },
  {
    title: 'Мэдээллийн аюулгүй байдал',
    label: 'Security',
    description: 'IT аюулгүй байдал, нэвтрэлт шалгалт, криптограф шийдэл.',
  },
  {
    title: 'Системийн шинжилгээ',
    label: 'Systems',
    description: 'Бизнесийн процесс дүрслэл, системийн архитектур зөвлөгөө.',
  },
  {
    title: 'Программ хөгжүүлэлт',
    label: 'Apps',
    description: 'Мобайл апп, GUI болон тусгай програм хийнэ.',
  },
]

const principles = [
  'Strategy before screens',
  'Security in the foundation',
  'Fast delivery, clean handoff',
]

const members = [
  {
    name: 'X',
    role: 'Founder / Full-stack Developer',
    focus: 'Web systems, product architecture, delivery',
    initials: 'M1',
  },
  {
    name: 'X',
    role: 'Co-founder / Infrastructure Specialist',
    focus: 'Networks, databases, security operations',
    initials: 'M2',
  },
]

function HorseLogo() {
  return (
    <svg className="horse-logo" viewBox="0 0 96 96" role="img" aria-labelledby="horse-title">
      <title id="horse-title">Hara Joro black horse logo</title>
      <path
        d="M70.9 19.2c-11.2 1.1-20 7-26.4 17.8l-11.6 19.4-15.3 4.9 12.6 7-4.6 13.4 19.7-10.8 19.5 13-4.8-18.2 14.6-12.2-18.3-1.2 7-11.8c3.7-6.3 9.3-10.5 16.8-12.8l-9.2-8.5Z"
        fill="currentColor"
      />
      <path
        d="M64.2 20.8c-4.2 8.9-3.5 16.8 2.3 23.7 4.7 5.6 11.9 8.3 21.5 8.1-3.9-5.5-6.3-11.4-7-17.7-.8-6.3 1-12.1 5.4-17.3-7.9-1-15.3.1-22.2 3.2Z"
        fill="currentColor"
        opacity=".9"
      />
      <path
        d="M28.8 55.1c9.4 4 18.7 4.4 28 1.4"
        fill="none"
        stroke="var(--mark-line)"
        strokeLinecap="round"
        strokeWidth="3.2"
      />
      <circle cx="72.4" cy="31.1" r="2.9" fill="var(--mark-eye)" />
    </svg>
  )
}

function App() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Hara Joro home">
          <span className="brand-mark">
            <HorseLogo />
          </span>
          <span className="brand-text">
            <strong>Hara Joro</strong>
            <small>Хүчирхэг хурдан үнэнч</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#services">Үйлчилгээ</a>
          <a href="#brand">Брэнд</a>
          <a href="#members">Баг</a>
          <a href="#contact">Холбогдох</a>
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow"></p>
          <h1 className="hero-headline">
            Орчин үеийн технологийг эзэрхийлэх нүүдэлчин хүч. 
          </h1>
          <p className="hero-lede">
            IT таны бизнесийг хурдасгах ёстой, удаашруулах биш. Бид таны үнэнч түнш байж, таны бизнессд тулгарж буй бэрхшээлийг шийдэх зорилготой .
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#contact">
              Төсөл эхлүүлэх
            </a>
            <a className="secondary-action" href="#services">
              Үйлчилгээнүүд
            </a>
          </div>
        </div>

        <div className="hero-panel" aria-label="Hara Joro brand system preview">
          <div className="panel-grid">
            <span>HJ</span>
            <span>01</span>
            <span>BLACK</span>
            <span>HORSE</span>
          </div>
          <div className="horse-orbit">
            <HorseLogo />
          </div>
          <div className="metric-card metric-top">
            <small>Service stack</small>
            <strong>Web · Data · Security</strong>
          </div>
          <div className="metric-card metric-bottom">
            <small>Brand code</small>
            <strong>Power with loyalty</strong>
          </div>
        </div>
      </section>

      <section className="brand-strip" aria-label="Hara Joro positioning">

        <div className="strip-rail" aria-hidden="true">
          <div className="strip-track">
            <span>Build</span>
            <span>Protect</span>
            <span>Connect</span>
            <span>Scale</span>
            <span>Build</span>
            <span>Protect</span>
            <span>Connect</span>
            <span>Scale</span>
          </div>
        </div>
      
      </section>

      <section className="services-section" id="services">
        <div className="section-intro">
          <div className="intro-meta">
            <p className="eyebrow">Үйлчилгээнүүд</p>
            <span>06 core capabilities</span>
          </div>
          <div className="intro-main">
            <h2 className="intro-headline">Нэг баг. Зургаан үндсэн чадвар.</h2>
            <p>
              Вебээс эхлээд өгөгдөл, сүлжээ, аюулгүй байдал, системийн шинжилгээ,
              тусгай программ хүртэл IT үйлчилгээнүүд.
            </p>
          </div>
      
        </div>

        <div className="service-list">
          {services.map((service, index) => (
            <article className="service-row" data-label={service.label} key={service.title}>
              <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="service-label">{service.label}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-section" id="brand">
        <div className="brand-story">
          <p className="eyebrow">Brand idea</p>
          <h2>Хүчирхэг, хурдан, үнэнч түнш.</h2>
          <p>
            Морь бол хүч чадал, хурд, үнэнч нөхөрлөлийн бэлгэдэл. Нүүдэлчин монголчуудын амьдралд морь хамгийн ойрын анд байсан шиг Hara Joro нь таны бизнесийн технологийн найдвартай түнш байх зорилготой.
          </p>
        </div>

        <div className="principle-stack">
          {principles.map((principle) => (
            <div className="principle-card" key={principle}>
              <HorseLogo />
              <strong>{principle}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="members-section" id="members">
        <div className="members-intro">
          <p className="eyebrow">Core team</p>
          <h1 className='members-headline'>Одоогоор хоёр гишүүнтэй ч өсөж дэвжхийг хүсэж буй өлсөглөн баг.</h1>
          <p>
            Hara Joro жижиг цөмөөс том руу тэмүүлэх болно. 
            <br />
            Шинэ гишүүдэд үүд хаалга маань үргэлж нээлттэй байх болно.
          </p>
        </div>

        <div className="member-grid">
          {members.map((member, index) => (
            <article className="member-card" key={member.name}>
              <div className="member-avatar" aria-hidden="true">
                <span>{member.initials}</span>
                <HorseLogo />
              </div>
              <div className="member-copy">
                <span className="member-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{member.name}</h3>
                <strong>{member.role}</strong>
                <p>{member.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-mark" aria-hidden="true">
          <HorseLogo />
        </div>
        <div>
          <p className="eyebrow">Ready for launch</p>
          <h2>Дараагийн үеийн хүчирхэг Технологийн салбарын өрсөлдөгчийг бий болгоё.</h2>
        </div>
        <a className="primary-action" href="mailto:hello@harajoro.com">
          hello@harajoro.com
        </a>
      </section>
    </main>
  )
}

export default App
