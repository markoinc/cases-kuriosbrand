import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: January 15, 2025</p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p className="text-foreground/80 leading-relaxed">
                KuriosBrand LLC ("KURIOS," "we," "us," or "our") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or use our lead generation
                services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We may collect information about you in a variety of ways, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone number, and other
                  contact information you voluntarily provide.
                </li>
                <li>
                  <strong>Business Information:</strong> Agency name, license numbers, territory
                  preferences, and lead volume requirements.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type, device information, and
                  usage patterns collected automatically.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Provide, operate, and maintain our lead generation services</li>
                <li>Process and fulfill lead delivery requests</li>
                <li>Communicate with you about services, updates, and promotions</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing</h2>
              <p className="text-foreground/80 leading-relaxed">
                We do not sell your personal information. We may share information with trusted
                third-party service providers who assist us in operating our platform, conducting
                our business, or serving our clients, so long as those parties agree to keep this
                information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                When you visit or log in to our website, cookies and similar technologies may be 
                used by our online data partners or vendors to associate these activities with 
                other personal information they or others have about you, including by association 
                with your email or LinkedIn profile. We (or service providers on our behalf) may then 
                send communications and marketing to these contacts.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                You may opt out of receiving this advertising by visiting{" "}
                <a href="https://app.retention.com/optout" className="text-[#3366FF] hover:underline" target="_blank" rel="noopener noreferrer">
                  https://app.retention.com/optout
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Security</h2>
              <p className="text-foreground/80 leading-relaxed">
                We implement industry-standard security measures to protect your personal
                information. However, no method of transmission over the Internet or electronic
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
              <p className="text-foreground/80 leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal
                information, including the right to access, correct, or delete your data. To
                exercise these rights, please contact us using the information below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
                <br />
                <strong>Email:</strong> mark@kuriosbrand.com
                <br />
                <strong>Address:</strong> KuriosBrand LLC
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
