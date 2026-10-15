import PageTitle from '../components/PageTitle';

export default function AboutPage() {
  return (
    <section className="page-content">
      <PageTitle
        eyebrow="OUR PURPOSE"
        title="Benefits should be easier to find."
        subtitle="Welfora is a student project concept designed to make public support easier to understand."
      />

      <div className="about-grid">
        <div className="panel">
          <div className="about-symbol">✦</div>
          <h2>Find.</h2>
          <p>
            Discover support across education, healthcare, housing, agriculture and financial assistance.
          </p>
        </div>

        <div className="panel">
          <div className="about-symbol">◇</div>
          <h2>Understand.</h2>
          <p>
            Read plain-language summaries and check what documents may be required.
          </p>
        </div>

        <div className="panel">
          <div className="about-symbol">↗</div>
          <h2>Apply.</h2>
          <p>
            Use official government resources to confirm details and complete applications.
          </p>
        </div>
      </div>

      <p className="disclaimer">
        Welfora is an independent prototype, not a government website. Scheme information shown here is illustrative and must be verified through official sources.
      </p>
    </section>
  );
}
