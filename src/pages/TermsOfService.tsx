import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: January 15, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                By accessing or using the KURIOS platform and services, you agree to be bound by
                these Terms of Service. If you do not agree to these terms, you may not use our
                services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Services</h2>
              <p className="text-foreground/80 leading-relaxed">
                KURIOS provides lead generation services for personal injury law firms. Our
                platform delivers exclusive, TCPA-compliant motor vehicle accident (MVA) leads with compliance
                documentation including TrustedForm certificates and Jornaya LeadiD tokens.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Eligibility</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our services are available only to licensed attorneys and personal injury law firms. 
                By using our services, you represent that you hold all necessary bar admissions and 
                authorizations to practice law in your designated territory.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Lead Exclusivity</h2>
              <p className="text-foreground/80 leading-relaxed">
                KURIOS provides exclusive leads that are sold to only one law firm. Leads are
                territory-locked based on your subscription agreement. Attempting to contact leads
                outside your assigned territory is a violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Compliance Requirements</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Contact leads only using compliant methods as outlined in your agreement</li>
                <li>Honor all Do-Not-Call requests immediately</li>
                <li>Maintain records of all lead contacts for compliance purposes</li>
                <li>Not resell, share, or transfer leads to third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Payment Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                Payment terms are established in your individual service agreement. All fees are
                non-refundable except as specifically outlined in your agreement or required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-foreground/80 leading-relaxed">
                KURIOS is not liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of our services. Our total liability shall
                not exceed the fees paid by you in the twelve months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Termination</h2>
              <p className="text-foreground/80 leading-relaxed">
                Either party may terminate the service agreement with 30 days written notice.
                KURIOS reserves the right to immediately terminate services for violations of these
                terms or applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact</h2>
              <p className="text-foreground/80 leading-relaxed">
                For questions about these Terms of Service, contact us at:
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

export default TermsOfService;