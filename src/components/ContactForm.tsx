
import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success("Thank you for your message!", {
        description: "We'll get back to you as soon as possible."
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      icon: User,
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
      icon: Mail,
      required: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 98765 43210",
      icon: Phone,
      required: true,
    },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-stone-100"
    >
      {inputFields.map((field, index) => {
        const Icon = field.icon;
        const isFocused = focusedField === field.name;
        const hasValue = formData[field.name as keyof typeof formData].length > 0;

        return (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-stone-700 mb-2"
            >
              {field.label} {field.required && <span className="text-gold-dark">*</span>}
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isFocused || hasValue ? "text-gold-dark" : "text-stone-400"
                  }`}
                />
              </div>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                required={field.required}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                  isFocused
                    ? "border-gold-dark shadow-md"
                    : "border-stone-200 hover:border-stone-300"
                }`}
                placeholder={field.placeholder}
              />
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-stone-700 mb-2"
        >
          Message <span className="text-gold-dark">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-4 pointer-events-none">
            <MessageSquare
              className={`w-5 h-5 transition-colors duration-200 ${
                focusedField === "message" || formData.message.length > 0
                  ? "text-gold-dark"
                  : "text-stone-400"
              }`}
            />
          </div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            required
            rows={5}
            className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 resize-none ${
              focusedField === "message"
                ? "border-gold-dark shadow-md"
                : "border-stone-200 hover:border-stone-300"
            }`}
            placeholder="Tell us about your project requirements..."
          ></textarea>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full bg-gradient-to-r from-gold-dark to-gold-light text-white py-4 px-8 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-xs text-center text-stone-500 mt-4"
      >
        By submitting this form, you agree to our terms and privacy policy.
      </motion.p>
    </motion.form>
  );
};

export default ContactForm;
