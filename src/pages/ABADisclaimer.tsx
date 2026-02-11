import { Link } from "react-router-dom";
import { ArrowLeft, Scale } from "lucide-react";

const ABADisclaimer = () => {
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
            <Scale className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">ABA Rule 7.2 Disclaimer</h1>
          </div>
          <p className="text-muted-foreground mb-8">Last Updated: January 15, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Important Disclosure</h2>
              <p className="text-foreground/80 leading-relaxed">
                This is a commercial communication from KuriosBrand LLC. The information
                provided on this website and through our services is intended for licensed
                attorneys and personal injury law firms only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Nature of Services</h2>
              <p className="text-foreground/80 leading-relaxed">
                KuriosBrand LLC is a lead generation and marketing services company. We
                are NOT a law firm or legal services provider. We do not provide legal advice,
                legal representation, or legal counsel.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Professional Responsibility</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Attorneys and law firms using our services are solely responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Maintaining all required bar admissions and licenses</li>
                <li>Compliance with state and federal legal advertising regulations</li>
                <li>Adherence to professional conduct standards and bar rules</li>
                <li>Proper handling and disclosure of client information</li>
                <li>Accuracy of all representations made to potential clients</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">No Attorney-Client Relationship</h2>
              <p className="text-foreground/80 leading-relaxed">
                Nothing on this website or in our communications constitutes legal advice or
                creates an attorney-client relationship. For legal questions regarding compliance,
                advertising regulations, or professional responsibility, consult with a qualified
                attorney licensed in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Advertising Compliance</h2>
              <p className="text-foreground/80 leading-relaxed">
                This communication complies with ABA Model Rule 7.2 regarding advertising
                requirements. All claims made are substantiated and accurate to the best of our
                knowledge. Results may vary based on market conditions, firm practices, and other
                factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">State-Specific Notices</h2>
              <p className="text-foreground/80 leading-relaxed">
                Legal advertising and marketing regulations vary by state. Law firm partners are
                responsible for ensuring their use of KURIOS leads and marketing materials complies
                with all applicable state bar regulations and guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
              <p className="text-foreground/80 leading-relaxed">
                KuriosBrand LLC
                <br />
                <strong>Email:</strong> mark@kuriosbrand.com
                <br />
                <strong>Website:</strong> www.kuriosbrand.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABADisclaimer;