import { motion } from 'framer-motion'
import { useEffect } from 'react'

export const LinkedInSection = () => {
  useEffect(() => {
    // Load the LinkedIn SDK
    const script = document.createElement('script');
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Clean up function
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        LinkedIn Posts
      </motion.h1>
      
      <motion.p 
        className="text-center text-gray-400 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Recent updates and thoughts from my LinkedIn
      </motion.p>

      <motion.div
        className="flex flex-col items-center justify-center my-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* LinkedIn Profile Badge */}
        <div 
          className="badge-base LI-profile-badge mb-8" 
          data-locale="en_US" 
          data-size="medium" 
          data-theme="dark" 
          data-type="VERTICAL" 
          data-vanity="roey-zalta" 
          data-version="v1"
        >
          <a 
            className="badge-base__link LI-simple-link" 
            href="https://il.linkedin.com/in/roey-zalta?trk=profile-badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            Roey Zalta
          </a>
        </div>

        {/* LinkedIn Posts Embed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          <motion.div 
            className="bg-white/5 rounded-lg p-6 border border-white/10 h-[600px] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7147230290267205632"
              height="570"
              width="100%"
              frameBorder="0"
              allowFullScreen=""
              title="Embedded post"
              className="rounded"
            ></iframe>
          </motion.div>

          <motion.div 
            className="bg-white/5 rounded-lg p-6 border border-white/10 h-[600px] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7136006472894332928"
              height="570"
              width="100%"
              frameBorder="0"
              allowFullScreen=""
              title="Embedded post"
              className="rounded"
            ></iframe>
          </motion.div>
        </div>

        {/* View More Link */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://linkedin.com/in/roey-zalta"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors inline-flex items-center gap-2"
          >
            <span>View More on LinkedIn</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
} 