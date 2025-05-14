import React, { useState } from 'react';
import './index.css';
import Step1Name from './components/Step1Name';
import Step2Phone from './components/Step2Phone';
import Step3Household from './components/Step3Household';
import Step4ColdPressed from './components/Step4ColdPressed';
import Step5CurrentOils from './components/Step5CurrentOils';
import Step6Recommendation from './components/Step6Recommendation';
import ProgressBar from './components/ProgressBar';
import Header from './components/Header'; // ✅ Import Header

import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    adults: 1,
    kids: 0,
    usesColdPressed: null,
    currentOils: [],
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  const updateForm = (updates) => setFormData((prev) => ({ ...prev, ...updates }));

  const props = { formData, updateForm, nextStep, prevStep };

  const getStepComponent = () => {
    switch (step) {
      case 1: return <Step1Name {...props} />;
      case 2: return <Step2Phone {...props} />;
      case 3: return <Step3Household {...props} />;
      case 4: return <Step4ColdPressed {...props} />;
      case 5: return <Step5CurrentOils {...props} />;
      case 6: return <Step6Recommendation {...props} />;
      default: return <Step1Name {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 pt-4">
      <div className="w-full max-w-md">
        <Header /> {/* ✅ Shopify-style header */}
        <ProgressBar step={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {getStepComponent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}