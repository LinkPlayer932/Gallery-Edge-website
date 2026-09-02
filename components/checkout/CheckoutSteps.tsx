import { Check } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: "Shipping" },
  { number: 2, label: "Payment" },
  { number: 3, label: "Review" },
];

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {steps.map((step, index) => {
        const isComplete = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  isActive || isComplete
                    ? "bg-amber-700 text-white"
                    : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {isComplete ? <Check size={14} /> : step.number}
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive || isComplete ? "text-neutral-900" : "text-neutral-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && <div className="h-px w-10 bg-neutral-300" />}
          </div>
        );
      })}
    </div>
  );
}
