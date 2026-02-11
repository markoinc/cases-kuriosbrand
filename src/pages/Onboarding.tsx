import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { InfoTooltip } from "@/components/InfoTooltip";
import { ArrowLeft, ArrowRight, Building2, MapPin, Clock, Shield, Send, Phone, FileText, Loader2, Calendar, Mail } from "lucide-react";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/OsNgWuy8oZzLbp5BXbnD/webhook-trigger/caf6afbb-04d1-4dda-9b12-8ef27b95f6d8";

type FormData = {
  // Email for contact matching
  email: string;
  // Firm & Contacts
  firmNameAddress: string;
  decisionMakerName: string;
  decisionMakerEmail: string;
  decisionMakerPhone: string;
  intakeContact: string;
  billingContact: string;
  timezone: string;
  // Case Types
  caseTypes: string[];
  caseTypesOther: string;
  // Geography
  statesAccepted: string;
  priorityAreas: string;
  excludedAreas: string;
  // Timing & Treatment
  maxTimeSinceAccident: string;
  maxTimeSinceAccidentOther: string;
  treatmentRule: string;
  treatmentDays: string;
  // Quality Filters
  minInjuryThreshold: string;
  minInjuryThresholdOther: string;
  hardNoDisqualifiers: string[];
  hardNoDisqualifiersOther: string;
  // Lead Delivery
  primaryDeliverySystem: string;
  primaryDeliverySystemOther: string;
  recipientsRouting: string;
  backupDeliveryMethod: string;
  // Intake Availability
  weekdayIntakeHours: string;
  weekendIntakeHours: string;
  afterHoursCoverage: string;
  // Reporting & Launch
  reportingOwnerName: string;
  reportingOwnerEmail: string;
  reportingCadence: string;
  reportingFormat: string;
  creativeApproverName: string;
  creativeApproverEmail: string;
  permissionBranding: string;
  targetLaunchDate: string;
};

const initialFormData: FormData = {
  email: "",
  firmNameAddress: "",
  decisionMakerName: "",
  decisionMakerEmail: "",
  decisionMakerPhone: "",
  intakeContact: "",
  billingContact: "",
  timezone: "",
  caseTypes: [],
  caseTypesOther: "",
  statesAccepted: "",
  priorityAreas: "",
  excludedAreas: "",
  maxTimeSinceAccident: "",
  maxTimeSinceAccidentOther: "",
  treatmentRule: "",
  treatmentDays: "",
  minInjuryThreshold: "",
  minInjuryThresholdOther: "",
  hardNoDisqualifiers: [],
  hardNoDisqualifiersOther: "",
  primaryDeliverySystem: "",
  primaryDeliverySystemOther: "",
  recipientsRouting: "",
  backupDeliveryMethod: "",
  weekdayIntakeHours: "",
  weekendIntakeHours: "",
  afterHoursCoverage: "",
  reportingOwnerName: "",
  reportingOwnerEmail: "",
  reportingCadence: "",
  reportingFormat: "",
  creativeApproverName: "",
  creativeApproverEmail: "",
  permissionBranding: "",
  targetLaunchDate: "",
};

const CASE_TYPE_OPTIONS = [
  "Motor Vehicle Accident (Auto)",
  "Motorcycle",
  "Pedestrian / Bicycle",
  "Rideshare (Uber / Lyft)",
  "UM / UIM",
  "Commercial / Trucking",
];

const HARD_NO_OPTIONS = [
  "Already represented by an attorney",
  "No injury / property damage only",
  "At-fault claimant",
  "Outside approved geography",
  "Duplicate / spam / non-human",
  "Government vehicle involved",
  "Minor claimant",
];

const STEPS = [
  { id: 1, title: "Get Started", icon: Mail },
  { id: 2, title: "Firm & Contacts", icon: Building2 },
  { id: 3, title: "Case Types", icon: FileText },
  { id: 4, title: "Geography", icon: MapPin },
  { id: 5, title: "Timing & Treatment", icon: Clock },
  { id: 6, title: "Quality Filters", icon: Shield },
  { id: 7, title: "Lead Delivery", icon: Send },
  { id: 8, title: "Intake Availability", icon: Phone },
  { id: 9, title: "Reporting & Launch", icon: FileText },
  { id: 10, title: "Schedule Call", icon: Calendar },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedData, setHasSubmittedData] = useState(false);
  const { toast } = useToast();

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      updateField(field, currentArray.filter((v) => v !== value));
    } else {
      updateField(field, [...currentArray, value]);
    }
  };

  const submitData = async () => {
    if (hasSubmittedData) return true; // Already submitted
    
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        caseTypes: formData.caseTypes.join(", ") + (formData.caseTypesOther ? `, ${formData.caseTypesOther}` : ""),
        hardNoDisqualifiers: formData.hardNoDisqualifiers.join(", ") + (formData.hardNoDisqualifiersOther ? `, ${formData.hardNoDisqualifiersOther}` : ""),
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setHasSubmittedData(true);
      toast({
        title: "Information Saved",
        description: "Your onboarding data has been submitted. Now schedule your call!",
      });
      return true;
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (step === 9) {
      // Submit data before going to calendar
      const success = await submitData();
      if (success) {
        setStep(10);
      }
    } else {
      setStep((s) => s + 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 2:
        return formData.firmNameAddress && formData.decisionMakerName && formData.decisionMakerEmail && formData.decisionMakerPhone && formData.timezone;
      case 3:
        return formData.caseTypes.length > 0 || formData.caseTypesOther;
      case 4:
        return formData.statesAccepted;
      case 5:
        return formData.maxTimeSinceAccident && formData.treatmentRule;
      case 6:
        return formData.minInjuryThreshold;
      case 7:
        return formData.primaryDeliverySystem;
      case 8:
        return formData.weekdayIntakeHours;
      case 9:
        return formData.reportingOwnerName && formData.reportingOwnerEmail && formData.reportingCadence && formData.reportingFormat;
      case 10:
        return true; // Calendar step - always can proceed
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Header */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-foreground">PI MVA Client Onboarding</h1>
            <span className="text-sm text-muted-foreground">Step {step} of {STEPS.length}</span>
          </div>
          <div className="flex gap-1">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s.id <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            {(() => {
              const StepIcon = STEPS[step - 1].icon;
              return <StepIcon className="w-4 h-4 text-primary" />;
            })()}
            <span className="text-sm font-medium text-foreground">{STEPS[step - 1].title}</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Step 1: Get Started - Email */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-2xl font-bold text-foreground">Let's Get Started</h2>
                <p className="text-muted-foreground">
                  Enter your email address so we can match your information to your account.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@yourfirm.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Firm & Contacts */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="firmNameAddress">Legal Firm Name and Main Office Address *</Label>
                <Input
                  id="firmNameAddress"
                  value={formData.firmNameAddress}
                  onChange={(e) => updateField("firmNameAddress", e.target.value)}
                  placeholder="Firm Name, 123 Main St, City, State ZIP"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="decisionMakerName">Primary Decision Maker Name *</Label>
                <Input
                  id="decisionMakerName"
                  value={formData.decisionMakerName}
                  onChange={(e) => updateField("decisionMakerName", e.target.value)}
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="decisionMakerEmail">Primary Decision Maker Email *</Label>
                <Input
                  id="decisionMakerEmail"
                  type="email"
                  value={formData.decisionMakerEmail}
                  onChange={(e) => updateField("decisionMakerEmail", e.target.value)}
                  placeholder="john@firm.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="decisionMakerPhone">Primary Decision Maker Phone *</Label>
                <Input
                  id="decisionMakerPhone"
                  type="tel"
                  value={formData.decisionMakerPhone}
                  onChange={(e) => updateField("decisionMakerPhone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intakeContact">
                  Intake / Operations Contact (Name, Email, Phone)
                  <InfoTooltip content="The person who handles incoming leads and coordinates case intake. This contact will receive lead notifications and manage follow-ups." />
                </Label>
                <Input
                  id="intakeContact"
                  value={formData.intakeContact}
                  onChange={(e) => updateField("intakeContact", e.target.value)}
                  placeholder="Jane Doe, jane@firm.com, (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingContact">Billing Contact (Name, Email, Phone)</Label>
                <Input
                  id="billingContact"
                  value={formData.billingContact}
                  onChange={(e) => updateField("billingContact", e.target.value)}
                  placeholder="Bob Johnson, billing@firm.com, (555) 987-6543"
                />
              </div>
              <div className="space-y-2">
                <Label>Firm Time Zone *</Label>
                <Select value={formData.timezone} onValueChange={(v) => updateField("timezone", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Eastern">Eastern</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="Mountain">Mountain</SelectItem>
                    <SelectItem value="Pacific">Pacific</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Case Types */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <Label>
                  Accepted Case Types *
                  <InfoTooltip content="Select all types of personal injury cases your firm is willing to accept leads for." />
                </Label>
                <div className="space-y-3">
                  {CASE_TYPE_OPTIONS.map((option) => (
                    <div key={option} className="flex items-center space-x-3">
                      <Checkbox
                        id={option}
                        checked={formData.caseTypes.includes(option)}
                        onCheckedChange={() => toggleArrayField("caseTypes", option)}
                      />
                      <Label htmlFor={option} className="font-normal cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="caseTypesOther">Other Case Types</Label>
                <Input
                  id="caseTypesOther"
                  value={formData.caseTypesOther}
                  onChange={(e) => updateField("caseTypesOther", e.target.value)}
                  placeholder="Enter any other case types"
                />
              </div>
            </div>
          )}

          {/* Step 4: Geography */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="statesAccepted">States You Accept Cases In *</Label>
                <Input
                  id="statesAccepted"
                  value={formData.statesAccepted}
                  onChange={(e) => updateField("statesAccepted", e.target.value)}
                  placeholder="e.g., California, Texas, Florida"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priorityAreas">
                  Priority Metros / Counties / ZIP Codes
                  <InfoTooltip content="Areas where you want to receive the most leads. We'll prioritize ad spend in these locations." />
                </Label>
                <Textarea
                  id="priorityAreas"
                  value={formData.priorityAreas}
                  onChange={(e) => updateField("priorityAreas", e.target.value)}
                  placeholder="List priority areas..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excludedAreas">
                  Excluded Areas (States, Metros, or ZIPs)
                  <InfoTooltip content="Areas where you do NOT want to receive leads. We'll exclude these from targeting." />
                </Label>
                <Textarea
                  id="excludedAreas"
                  value={formData.excludedAreas}
                  onChange={(e) => updateField("excludedAreas", e.target.value)}
                  placeholder="List excluded areas..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 5: Timing & Treatment */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <Label>
                  Maximum Time Since Accident You Will Accept *
                  <InfoTooltip content="How recent must the accident be for you to accept the case? Older accidents may have statute of limitations or evidence concerns." />
                </Label>
                <RadioGroup
                  value={formData.maxTimeSinceAccident}
                  onValueChange={(v) => updateField("maxTimeSinceAccident", v)}
                >
                  {["7 days or less", "14 days or less", "30 days or less", "60 days or less", "Other"].map((option) => (
                    <div key={option} className="flex items-center space-x-3">
                      <RadioGroupItem value={option} id={`time-${option}`} />
                      <Label htmlFor={`time-${option}`} className="font-normal cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {formData.maxTimeSinceAccident === "Other" && (
                  <Input
                    value={formData.maxTimeSinceAccidentOther}
                    onChange={(e) => updateField("maxTimeSinceAccidentOther", e.target.value)}
                    placeholder="Specify maximum time"
                    className="mt-2"
                  />
                )}
              </div>
              <div className="space-y-3">
                <Label>
                  Medical Treatment Rule *
                  <InfoTooltip content="Your requirement for medical treatment status. Some firms require treatment to have already started, others accept cases where treatment is scheduled." />
                </Label>
                <RadioGroup
                  value={formData.treatmentRule}
                  onValueChange={(v) => updateField("treatmentRule", v)}
                >
                  {["Treatment already started", "Treatment started or scheduled within X days", "Will consider no-treatment cases"].map((option) => (
                    <div key={option} className="flex items-center space-x-3">
                      <RadioGroupItem value={option} id={`treatment-${option}`} />
                      <Label htmlFor={`treatment-${option}`} className="font-normal cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {formData.treatmentRule === "Treatment started or scheduled within X days" && (
                  <Input
                    type="number"
                    value={formData.treatmentDays}
                    onChange={(e) => updateField("treatmentDays", e.target.value)}
                    placeholder="Number of days"
                    className="mt-2 w-40"
                  />
                )}
              </div>
            </div>
          )}

          {/* Step 6: Quality Filters */}
          {step === 6 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <Label>
                  Minimum Injury Threshold *
                  <InfoTooltip content="The minimum severity of injury required for you to accept a case. 'Pain only' typically refers to subjective pain without documented injury." />
                </Label>
                <RadioGroup
                  value={formData.minInjuryThreshold}
                  onValueChange={(v) => updateField("minInjuryThreshold", v)}
                >
                  {["Any injury", "Soft tissue acceptable", "No \"pain only\" cases", "Other"].map((option) => (
                    <div key={option} className="flex items-center space-x-3">
                      <RadioGroupItem value={option} id={`injury-${option}`} />
                      <Label htmlFor={`injury-${option}`} className="font-normal cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {formData.minInjuryThreshold === "Other" && (
                  <Input
                    value={formData.minInjuryThresholdOther}
                    onChange={(e) => updateField("minInjuryThresholdOther", e.target.value)}
                    placeholder="Specify threshold"
                    className="mt-2"
                  />
                )}
              </div>
              <div className="space-y-3">
                <Label>
                  Hard NO Disqualifiers
                  <InfoTooltip content="Automatic disqualification criteria. Leads matching any of these will be filtered out before delivery." />
                </Label>
                <div className="space-y-3">
                  {HARD_NO_OPTIONS.map((option) => (
                    <div key={option} className="flex items-center space-x-3">
                      <Checkbox
                        id={`hardno-${option}`}
                        checked={formData.hardNoDisqualifiers.includes(option)}
                        onCheckedChange={() => toggleArrayField("hardNoDisqualifiers", option)}
                      />
                      <Label htmlFor={`hardno-${option}`} className="font-normal cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hardNoOther">Other Disqualifiers</Label>
                <Input
                  id="hardNoOther"
                  value={formData.hardNoDisqualifiersOther}
                  onChange={(e) => updateField("hardNoDisqualifiersOther", e.target.value)}
                  placeholder="Enter any other disqualifiers"
                />
              </div>
            </div>
          )}

          {/* Step 7: Lead Delivery */}
          {step === 7 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <Label>
                  Primary Delivery System *
                  <InfoTooltip content="The main platform or method where you want leads delivered. Choose your CRM or preferred communication channel." />
                </Label>
                <Select value={formData.primaryDeliverySystem} onValueChange={(v) => updateField("primaryDeliverySystem", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Filevine">Filevine</SelectItem>
                    <SelectItem value="Litify">Litify</SelectItem>
                    <SelectItem value="Law Ruler">Law Ruler</SelectItem>
                    <SelectItem value="Salesforce">Salesforce</SelectItem>
                    <SelectItem value="LeadDocket">LeadDocket</SelectItem>
                    <SelectItem value="Webhook">Webhook</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="Combination">Combination</SelectItem>
                  </SelectContent>
                </Select>
                {formData.primaryDeliverySystem === "Combination" && (
                  <Input
                    value={formData.primaryDeliverySystemOther}
                    onChange={(e) => updateField("primaryDeliverySystemOther", e.target.value)}
                    placeholder="Specify the combination of delivery methods"
                    className="mt-2"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientsRouting">Recipients / Routing Details</Label>
                <p className="text-sm text-muted-foreground">Where and how should leads be delivered? Include email addresses, phone numbers, webhook URLs, or CRM routing rules.</p>
                <Textarea
                  id="recipientsRouting"
                  value={formData.recipientsRouting}
                  onChange={(e) => updateField("recipientsRouting", e.target.value)}
                  placeholder="e.g., Send leads to intake@firm.com and text to (555) 123-4567, route auto cases to Team A"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Backup Delivery Method
                  <InfoTooltip content="A secondary delivery method in case the primary system fails or is unavailable." />
                </Label>
                <Select value={formData.backupDeliveryMethod} onValueChange={(v) => updateField("backupDeliveryMethod", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select backup method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="Secondary CRM route">Secondary CRM route</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 8: Intake Availability */}
          {step === 8 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="weekdayIntakeHours">Weekday Intake Hours *</Label>
                <Input
                  id="weekdayIntakeHours"
                  value={formData.weekdayIntakeHours}
                  onChange={(e) => updateField("weekdayIntakeHours", e.target.value)}
                  placeholder="e.g., 8:00 AM - 6:00 PM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weekendIntakeHours">Weekend Intake Hours</Label>
                <Input
                  id="weekendIntakeHours"
                  value={formData.weekendIntakeHours}
                  onChange={(e) => updateField("weekendIntakeHours", e.target.value)}
                  placeholder="e.g., 10:00 AM - 2:00 PM or N/A"
                />
              </div>
              <div className="space-y-3">
                <Label>
                  After-Hours Coverage Available
                  <InfoTooltip content="Do you have staff or an answering service available to respond to leads outside of regular business hours?" />
                </Label>
                <RadioGroup
                  value={formData.afterHoursCoverage}
                  onValueChange={(v) => updateField("afterHoursCoverage", v)}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Yes" id="afterhours-yes" />
                    <Label htmlFor="afterhours-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="No" id="afterhours-no" />
                    <Label htmlFor="afterhours-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 9: Reporting & Launch */}
          {step === 9 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="reportingOwnerName">
                  Reporting Owner (Name and Role) *
                  <InfoTooltip content="The person who will receive and review campaign performance reports and metrics." />
                </Label>
                <Input
                  id="reportingOwnerName"
                  value={formData.reportingOwnerName}
                  onChange={(e) => updateField("reportingOwnerName", e.target.value)}
                  placeholder="Jane Smith, Marketing Director"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportingOwnerEmail">Reporting Owner Email *</Label>
                <Input
                  id="reportingOwnerEmail"
                  type="email"
                  value={formData.reportingOwnerEmail}
                  onChange={(e) => updateField("reportingOwnerEmail", e.target.value)}
                  placeholder="jane@firm.com"
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Reporting Update Cadence *
                  <InfoTooltip content="How often would you like to receive performance reports and campaign updates?" />
                </Label>
                <Select value={formData.reportingCadence} onValueChange={(v) => updateField("reportingCadence", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cadence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="3x per week">3x per week</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Reporting Format *</Label>
                <Select value={formData.reportingFormat} onValueChange={(v) => updateField("reportingFormat", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Google Sheet">Google Sheet</SelectItem>
                    <SelectItem value="CRM export">CRM export</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="creativeApproverName">
                  Creative Approver (Name and Title)
                  <InfoTooltip content="The person authorized to approve ad creatives, landing pages, and marketing materials before they go live." />
                </Label>
                <Input
                  id="creativeApproverName"
                  value={formData.creativeApproverName}
                  onChange={(e) => updateField("creativeApproverName", e.target.value)}
                  placeholder="John Doe, Partner"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creativeApproverEmail">Creative Approver Email</Label>
                <Input
                  id="creativeApproverEmail"
                  type="email"
                  value={formData.creativeApproverEmail}
                  onChange={(e) => updateField("creativeApproverEmail", e.target.value)}
                  placeholder="john@firm.com"
                />
              </div>
              <div className="space-y-3">
                <Label>
                  Permission to Use Firm Name / Branding in Ads
                  <InfoTooltip content="Can we use your firm's name, logo, and branding in advertising materials? Some firms prefer anonymous or generic ads." />
                </Label>
                <RadioGroup
                  value={formData.permissionBranding}
                  onValueChange={(v) => updateField("permissionBranding", v)}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="Yes" id="branding-yes" />
                    <Label htmlFor="branding-yes" className="font-normal cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="No" id="branding-no" />
                    <Label htmlFor="branding-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetLaunchDate">Target Launch Date</Label>
                <Input
                  id="targetLaunchDate"
                  type="date"
                  value={formData.targetLaunchDate}
                  onChange={(e) => updateField("targetLaunchDate", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 10: Schedule Call */}
          {step === 10 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-2 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Your Information Has Been Saved!</h2>
                <p className="text-muted-foreground">
                  Now book a 15-30 minute call to review your requirements with our team.
                </p>
              </div>
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <iframe 
                  src="https://api.leadconnectorhq.com/widget/booking/WY54cWSmaeiHOI5r6HtB" 
                  style={{ width: '100%', minHeight: '1000px', border: 'none' }}
                  title="Schedule Onboarding Call"
                />
              </div>
              <div className="text-center pt-4">
                <Button variant="outline" onClick={() => window.location.href = "/"}>
                  Return Home
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation - Hide on step 10 since calendar is the final action */}
        {step < 10 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : step === 9 ? (
                <>
                  Save & Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
