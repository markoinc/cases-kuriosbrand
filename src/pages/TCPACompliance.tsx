import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Check } from "lucide-react";

const TCPACompliance = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-kurios section-padding">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">TCPA Compliance Statement</h1>
          </div>
          <p className="text-muted-foreground mb-8">Last Updated: January 15, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment to TCPA Compliance</h2>
              <p className="text-foreground/80 leading-relaxed">
                KuriosBrand LLC is fully committed to compliance with the Telephone
                Consumer Protection Act (TCPA) and all related FCC regulations. We understand that
                our law firm partners' reputations and practices depend on compliant lead generation
                practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">FCC 2025 One-to-One Consent Rule</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Effective January 27, 2025, the FCC requires "one-to-one" consent for telemarketing
                calls and texts. KURIOS leads are fully compliant with this requirement:
              </p>
              <ul className="space-y-3">
                {[
                  "Each lead provides explicit consent to be contacted by a single, named law firm",
                  "Consent is not shared, sold, or transferred to multiple parties",
                  "The law firm name is clearly disclosed at the point of consent",
                  "Consent language is clear, conspicuous, and unambiguous",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Consent Documentation</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Every KURIOS lead includes comprehensive documentation to defend against TCPA claims:
              </p>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-foreground">TrustedForm Certificate</h3>
                  <p className="text-muted-foreground text-sm">
                    Independent third-party verification with session replay capability
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Jornaya LeadiD Token</h3>
                  <p className="text-muted-foreground text-sm">
                    Universal lead identifier for cross-network verification
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">IP Address & Timestamp</h3>
                  <p className="text-muted-foreground text-sm">
                    Precise logging of when and where consent was provided
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">User-Agent String</h3>
                  <p className="text-muted-foreground text-sm">
                    Device and browser verification for authenticity
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Consent Text Capture</h3>
                  <p className="text-muted-foreground text-sm">
                    Exact language the consumer agreed to at time of submission
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Prior Express Written Consent</h2>
              <p className="text-foreground/80 leading-relaxed">
                All KURIOS leads include Prior Express Written Consent (PEWC) as required by the
                TCPA for telemarketing calls. This consent is obtained through a clear and
                conspicuous disclosure, separate from other terms, and requires an affirmative
                action by the consumer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Do-Not-Call Compliance</h2>
              <p className="text-foreground/80 leading-relaxed">
                KURIOS maintains internal Do-Not-Call lists and scrubs all leads against the
                National Do-Not-Call Registry. Agency partners are required to honor all opt-out
                requests immediately and maintain their own internal DNC lists.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Questions?</h2>
              <p className="text-foreground/80 leading-relaxed">
                For questions about our TCPA compliance practices, contact our compliance team:
                <br />
                <strong>Email:</strong> mark@kuriosbrand.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCPACompliance;
