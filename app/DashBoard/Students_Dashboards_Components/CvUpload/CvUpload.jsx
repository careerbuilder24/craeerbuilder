import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Image from "next/image";
import Head from "next/head";

export default function Page() {
  const facebookIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAkCAYAAAB15jFqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADzSURBVFhH7ZUxCsJAEEW9jJ0XsBELj2HnGSR3sLSxs7O0sPAGFh7BA4iKARFEBBFGJrAwWf9mJxhWi/nwmjAzj91NNq32KKcUdMZn6i2ONFgfKJnU0Z2d0ksZk1YynFxpurrTdvckl33+KuBnqEdSS9rPLoUsFtQrqSWVK6sK6pWopbyl2qB+iVrK56UN6peopaHwlvMuoJ4QKim/QKGg+hgqaeg8l5sHrI9h0hJJpHzrSHg4Cn9Gfm02v33M84HSb6JZfeNSXi2aKWlc+pPt5YsEzZRAqfs3SlBQHZrnA6U+djmYNIZJS5jUpDH+V9osOb0BDRhzSNyArKMAAAAASUVORK5CYII=";
  const linkedinIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAnCAYAAABuf0pMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFLSURBVFhH7Zg/SgNBFIdzkZSeQAgIltba5QQ5gaUXsIt4g3SB9HapcwArQQQ1kBCwsLFJM8m3+pa3j8kyyPxp5gdfM/Nm38fszi7s4HK2dmeTVze8fskCveh59bRpGAxv/IVJOfYcPXz8CfgKMnF+/15WAKpAR+Bi8pYM3UfTCtw+bl3KrHd7N51/nRbIESR0c2gE2KJcsbejVwBjiJlggfHdZ1PAHPcuVoIEVs8/nSKf4H8TJGAfluwCRI4Mc+xIrAQLkNgPIAkWkBMgSPrG2bXF8rszbhMkwAV0ESdCIqdDoNaOwak3a3QBX3PBJxFdoA97XRJdgLWcEtbYdWBPUHQBHjodO59cgFod+8m1glWgClSBYAEWCvos63GwoVbPW8EggZQpLqCbtwLAvUsdvo66ObQCwE6kQvfRdARKUAWKCvz+oin6k2rjDi5lfqkTjl0iAAAAAElFTkSuQmCC";
  const youtubeIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAbCAYAAADh0qZQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEwSURBVFhH5ZgxDoIwFEA5DZ6DRHcPwB1cOYKTC+dwdPIC3EEHBzRxcXBwcah5QxNMfj8tYK3xJy8mQv9//hYKZvPdxewXS3PM8yTBLdus1uLBlMgOs5l4ICUy6cvU8JI8l6W51bW5b7fm0TTm2bZv9EX3XMYDuch5KgqxZpdeSZJ9OpCValtUSToYK7SOqpJMS6xgxiQHUCV91ttUQUMkB1AlY4fkAE5J1khIsH6ZsjHdd63LySRtAWSHruVokhZkQ7saLBl6+3EVuFaVtyw1pRz/Lcn40LUZLEnRkLCSfCZ94Yzd5yUPcEpC7JAcQJWMuS1SS3IAVTLmA8bgvZvbR6xwXdmgSsLY/dgntMc06JUEfmX39QEQt/iEPdeOJxc5tQ5avCS/zW+80qb/50BuXoEv6oT8g5gaAAAAAElFTkSuQmCC";
  const [cvData, setCvData] = useState({
    name: "",
    maritalStatus: "",
    contact: { email: "", address: "", permanentAddress: "", phone: "" },
    socialMedia: { facebook: "", linkedin: "", youtube: "" },
    objective: "",
    education: "",
    extraCurriculum: "",
    careerSummary: "",
    workExperience: "",
    coreSkills: "",
    additionalSections: [{ title: "", details: "" }],
    profileImage: null,
  });

  useEffect(() => {
    // Update the title dynamically based on the state or page context
    document.title = cvData.name ? `${cvData.name} - Professional CV` : "Create Your Professional CV";
  }, [cvData.name]); // Dependency array: update title when 'name' changes

  const handleInputChange = (e, section, subfield) => {
    const value = e.target.value;
    if (subfield) {
      setCvData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [subfield]: value },
      }));
    } else {
      setCvData((prev) => ({
        ...prev,
        [section]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };




  const downloadCv = () => {

    const doc = new jsPDF("portrait", "px", "a4");

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const sidePanelWidth = 140;

    //  Draws blue left background
    const drawLeftPanel = () => {
      doc.setFillColor("#44B5E6");
      doc.rect(0, 0, sidePanelWidth, pageHeight, "F");
    };

    // Horizontal white line inside left panel
    const addHorizontalLine = (y) => {
      const startX = 10;
      const endX = sidePanelWidth - 10;
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(startX, y, endX, y);
    };

    //  Add profile image and info only once
    // const addProfileDetails = () => {
    //   const imageX = 15;
    //   const imageY = 20;
    //   const imageWidth = 110;
    //   const imageHeight = 130;

    //   doc.setDrawColor(255, 255, 255);
    //   doc.setLineWidth(3);
    //   doc.rect(imageX - 3, imageY - 3, imageWidth + 6, imageHeight + 6);

    //   if (cvData.profileImage) {
    //     doc.addImage(cvData.profileImage, "JPEG", imageX, imageY, imageWidth, imageHeight);
    //   }

    //   let y = 200;

    //   doc.setTextColor("#ffffff");
    //   doc.setFont("helvetica", "bold");
    //   doc.setFontSize(20);
    //   const nameWidth = doc.getTextWidth(cvData.name || "Name not provided");
    //   doc.text(cvData.name || "Name not provided", sidePanelWidth / 2 - nameWidth / 2, y);
    //   y += 40;

    //   doc.setFontSize(14);
    //   const contactDetailsHeaderY = y;
    //   doc.text("Contact Details", sidePanelWidth / 2 - doc.getTextWidth("Contact Details") / 2, y);
    //   y += 20;
    //   addHorizontalLine(contactDetailsHeaderY + 5);

    //   const contactDetails = [
    //     `Email: ${cvData.contact.email || "Not provided"}`,
    //     `Phone: ${cvData.contact.phone || "Not provided"}`,
    //     `Address: ${cvData.contact.address || "Not provided"}`,
    //     `Permanent Address: ${cvData.contact.permanentAddress || "Not provided"}`,
    //   ];

    //   doc.setFont("helvetica", "normal");
    //   doc.setFontSize(12);
    //   const leftMargin = 4;
    //   const maxWidth = sidePanelWidth - 10;

    //   contactDetails.forEach((detail) => {
    //     const wrappedText = doc.splitTextToSize(detail, maxWidth);
    //     wrappedText.forEach((line) => {
    //       doc.text(line, leftMargin, y);
    //       y += 12;
    //     });
    //   });

    //   y += 20;
    //   doc.setFont("helvetica", "bold");
    //   doc.setFontSize(14);
    //   const coreSkillsTitle = "Core Skills";
    //   const coreSkillsTitleWidth = doc.getTextWidth(coreSkillsTitle);
    //   doc.text(coreSkillsTitle, sidePanelWidth / 2 - coreSkillsTitleWidth / 2, y);
    //   addHorizontalLine(y + 5);
    //   y += 20;

    //   const sortedSkills = (cvData.coreSkills || "Not provided")
    //     .split(",")
    //     .map((skill) => skill.trim())
    //     .sort();

    //   doc.setFont("helvetica", "normal");
    //   doc.setFontSize(12);
    //   sortedSkills.forEach((skill) => {
    //     const wrappedSkill = doc.splitTextToSize(skill, maxWidth);
    //     wrappedSkill.forEach((line) => {
    //       doc.text(line, leftMargin, y);
    //       y += 12;
    //     });
    //   });
    // };



    const addProfileDetails = () => {
      const imageX = 15;
      const imageY = 20;
      const imageWidth = 110;
      const imageHeight = 130;

      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(3);
      doc.rect(imageX - 3, imageY - 3, imageWidth + 6, imageHeight + 6);

      if (cvData.profileImage) {
        doc.addImage(cvData.profileImage, "JPEG", imageX, imageY, imageWidth, imageHeight);
      }

      let y = 200;

      doc.setTextColor("#ffffff");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      const nameWidth = doc.getTextWidth(cvData.name || "Name not provided");
      doc.text(cvData.name || "Name not provided", sidePanelWidth / 2 - nameWidth / 2, y);
      y += 40;

      doc.setFontSize(14);
      const contactDetailsHeaderY = y;
      doc.text("Contact Details", sidePanelWidth / 2 - doc.getTextWidth("Contact Details") / 2, y);
      y += 20;
      addHorizontalLine(contactDetailsHeaderY + 5);

      const contactDetails = [
        `Email: ${cvData.contact.email || "Not provided"}`,
        `Phone: ${cvData.contact.phone || "Not provided"}`,
        `Address: ${cvData.contact.address || "Not provided"}`,
        `Permanent Address: ${cvData.contact.permanentAddress || "Not provided"}`,
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const leftMargin = 4;
      const maxWidth = sidePanelWidth - 10;

      contactDetails.forEach((detail) => {
        const wrappedText = doc.splitTextToSize(detail, maxWidth);
        wrappedText.forEach((line) => {
          doc.text(line, leftMargin, y);
          y += 12;
        });
      });

      y += 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      const coreSkillsTitle = "Core Skills";
      const coreSkillsTitleWidth = doc.getTextWidth(coreSkillsTitle);
      doc.text(coreSkillsTitle, sidePanelWidth / 2 - coreSkillsTitleWidth / 2, y);
      addHorizontalLine(y + 5);
      y += 20;

      const sortedSkills = (cvData.coreSkills || "Not provided")
        .split(",")
        .map((skill) => skill.trim())
        .sort();

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      sortedSkills.forEach((skill) => {
        const wrappedSkill = doc.splitTextToSize(skill, maxWidth);
        wrappedSkill.forEach((line) => {
          doc.text(line, leftMargin, y);
          y += 12;
        });
      });

      //  Add Social Links Below Core Skills
      y += 20;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      const socialTitle = "Social";
      doc.text(socialTitle, sidePanelWidth / 2 - doc.getTextWidth(socialTitle) / 2, y);
      addHorizontalLine(y + 5);
      y += 20;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      // const socialLinks = [
      //   `Facebook: ${cvData.socialMedia.facebook || "Not provided"}`,
      //   `LinkedIn: ${cvData.socialMedia.linkedin || "Not provided"}`,
      //   `YouTube: ${cvData.socialMedia.youtube || "Not provided"}`,
      // ];

      // socialLinks.forEach((link) => {
      //   const wrappedLink = doc.splitTextToSize(link, maxWidth);
      //   wrappedLink.forEach((line) => {
      //     doc.text(line, leftMargin, y);
      //     y += 12;
      //   });
      // });

      const socialIcons = {
        facebook: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABVCAYAAAA49ahaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUbSURBVHhe7ZzNihU5FIB9GX9BUcFhVLAV5zHciYsBGWbXLlyIuHKhKIgL0Z3ILHoh4hu48BHmAaT7tg0iiAgiRL4rgbp1T24lqeQkKavgA+2+lZ+vU5WTk6p76K+3u2YmLbPUDFQj9crOrrn4fM+ce7gwZ+7um5O3PpoT/340R/8+MEduHJjD13/Bv/kZv+MzfJZzOJcypLK1KSb16ptdc+HZwpy9t78UZKWNhbIok7KpQ6o7N+pSGVGn7+yvjL5cUAd1UafUllyoSGXE/PFokXREhkLdtEFj9GaXeu7BYnkPlDpaAtpCm6S2piKb1PNPF+b4P+VG5hC0jTZKbR9Lcqlb/+2ZU7frldmHttJmqS+xJJX655OFygSUGtpM26U+xZBMKmGM1OCWoA9S30IZLZWAmyBcamSL0Jexi4hRUrde7RUNk3JBn+ib1GcfoqVeerlnjt2cnlALfaOPUt+HiJLKX3HKQi30MWbEBkvlfjPFS94FfQ29xwZLndKk5At9lly4CJJaQ9h0efuT2X7xxey8+2Y+HPxYYg/7//f/f1/y+PXX5eelckIJCbe8pRIcS5Vpce3+56Wo0IM/gFReDL4LBC+pLONKrpQYcbFHSqk48FnSekktuZYfI5QjpVTAheSoy6BUMjlS4RpwyY89UkuFoezWoNSS6bvuJBR75JCKE8mVZaNUkrlSoRqMveztkUMqbEp0O6Wy7VAyYx8z00tHLqm4cW3NOKWynyMVpkXoQdzK6EZil1RxqgSOJHdOqSWXoojwPRjROcVtAkeSO1EqW7pSIVqEzPrS+ZpI29+iVPbKpQK04LL1ObjcpfM1wVXf35pUbr6l95l8Z/4apOKqP2GtSeVxGelkTXylMqKl87XBWdfhmtQaMlGtSe1nsNak1pCAbk1qPwpYkUqGWzpJm9akQnd3YEVq6VDK0qLUbmi1IpWHZ6UTtGlRKu5EqTyVLJ2QGmTYrQ8XPod0XhdWW1L9OcCdKFVrUw+pGgdipfpz0N0cXJGqNfNrSSXJItWfg24EsCJVK9WnJZV7s1R/DnAnStVanmpJpR6p/hzgTpQqfTgHWlLJdkn15+K3kCrVnRNR6pQuf82ZH5yX/5QmKs0YFZwTlWYyhS0QF4RCPgezu3S+Rao3F86QqpYn+lpcpjqDf61l6hAtSnUuU+eESjzOhMqc+ovHmfqbk9TxOJPUoBkBuGhNanfmhzWp88ZfOIMbf/MWdTiDW9QtPUxRg1RcDT5MAaUf+2lJqtdjP1A6tGpJajeUsohSoWQU0IrU/qxvcUot+dBvK1KDH/rl5quVCuzTglTc9Ccoi1MqlHqRogWpUS9SWEq88lO71FGv/ECJl9Nqlzr65TTQfo2yZqlJXqME7Rd+a5WKg2Qv/ILmq+m1Sk36arpFK4NVo9R+JmoTQVKhls1BTbqbej4ESyXDXUMiWwv62s3q+xAsFeavUNpMlFSYv+zLTbRU4K84xVsBfYoZoZZRUoH7zZQmL/oSeg/tM1qqpYYNw7GEhE2bSCYVCI5L72/FQJt9A3sfkkoFlnElv3IpFNrqs/QMIblUC5mckt8UNARtG8o2xZJNqoVkbqkdBAnasinBnILsUoFtB/ZzSoZf1E0bXFsgKVGR2oUtXfbKNSY06qAuaRs5J+pSLYwYHpchjEk5gimLMilbY1RKFJPah4CbEcXDszyVTBCOIO6B3VHNv/kZv+MzfJZzOHds0J6KaqROiVlqBmapydk1PwFEkshF4PY93gAAAABJRU5ErkJggg==", // ← replace with actual base64
        linkedin: "data:image/png;base64,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",
        youtube: "data:image/png;base64,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",
      };

      const socialLinks = [
        { name: "Facebook", url: cvData.socialMedia.facebook, icon: socialIcons.facebook },
        { name: "LinkedIn", url: cvData.socialMedia.linkedin, icon: socialIcons.linkedin },
        { name: "YouTube", url: cvData.socialMedia.youtube, icon: socialIcons.youtube },
      ];

      socialLinks.forEach(({ name, url, icon }) => {
        if (icon) {
          doc.addImage(icon, "PNG", leftMargin, y - 12, 12, 12); // Icon placement
        }
        const linkText = `${name}: ${url || "Not provided"}`;
        const wrappedLink = doc.splitTextToSize(linkText, maxWidth - 16);
        wrappedLink.forEach((line, i) => {
          doc.text(line, leftMargin + 16, y); // Offset text right of icon
          y += 12;
        });
      });
    };

    // Justify and wrap content
    const justifyText = (text, x, y, width) => {
      const lines = doc.splitTextToSize(text, width);
      lines.forEach((line) => {
        doc.text(line, x, y);
        y += 12;
      });
      return y;
    };

    //  First page setup
    drawLeftPanel();
    addProfileDetails(); // only once
    doc.setTextColor("#000000");

    let mainY = 20;
    const contentX = sidePanelWidth + 20;
    const contentWidth = pageWidth - sidePanelWidth - 30;

    const sections = [
      { title: "Objective", content: cvData.objective },
      { title: "Education", content: cvData.education },
      { title: "Career Summary", content: cvData.careerSummary },
      { title: "Work Experience", content: cvData.workExperience }, // ← Add this
      { title: "Extra Curriculum", content: cvData.extraCurriculum },
    ];


    const addSection = (title, content) => {
      doc.setTextColor("#F87171");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);

      const titleWidth = doc.getTextWidth(title);
      doc.text(title, contentX + (contentWidth - titleWidth) / 2, mainY);
      mainY += 20;

      doc.setTextColor("#000000");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      mainY = justifyText(content || "Not provided", contentX, mainY, contentWidth);
      mainY += 20;
    };

    //  Loop with page break
    sections.forEach((section, index) => {
      if (mainY > pageHeight - 50) {
        doc.addPage();
        drawLeftPanel(); // only background
        mainY = 20;
      }
      addSection(section.title, section.content);
    });

    doc.save("generated_cv.pdf");
  };



  return (

    <>
      <Head>
        <title>Create Your Professional CV - Build and Download Your Resume</title>
        <meta
          name="description"
          content="Create and download your professional CV with a modern layout. Customize your contact details, skills, work experience, and more. Build your resume now."
        />
        <meta
          name="keywords"
          content="CV, Resume, Professional CV, Download Resume, Create CV, Build CV"
        />
        <meta name="author" content="Your Name or Your Company" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Create Your Professional CV - Build and Download Your Resume" />
        <meta
          property="og:description"
          content="Create and download your professional CV with a modern layout. Customize your contact details, skills, work experience, and more. Build your resume now."
        />
        <meta property="og:image" content="/path/to/your/og-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/create-cv" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Create Your Professional CV - Build and Download Your Resume" />
        <meta
          name="twitter:description"
          content="Create and download your professional CV with a modern layout. Customize your contact details, skills, work experience, and more. Build your resume now."
        />
        <meta name="twitter:image" content="/path/to/your/twitter-image.jpg" />

        {/* Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Create Your Professional CV - Build and Download Your Resume",
              "description": "Create and download your professional CV with a modern layout. Customize your contact details, skills, work experience, and more.",
              "url": "https://yourwebsite.com/create-cv",
              "image": "/path/to/your/og-image.jpg",
              "publisher": {
                "@type": "Organization",
                "name": "www.careerBuilder.com.bd",
              },
            }),
          }}
        />
      </Head>

      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create Your CV</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Side Panel */}
          <div className="col-span-1 bg-[#44B5E6] text-white p-4 rounded-lg">
            <div className="text-center mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-2 lg:w-full "
              />
              {cvData.profileImage && (
                <Image
                  src={cvData.profileImage}
                  alt="Profile"
                  width={400}
                  height={400}
                  className="w-full  h-full  mx-auto"
                />
              )}
            </div>
            <p className="font-bold text-lg">{cvData.name}</p>
            <p>{cvData.contact.email}</p>
            <p>{cvData.contact.phone}</p>
            <p>{cvData.contact.address}</p>
            <p>{cvData.contact.permanentAddress}</p>

            <div className="mt-4">
              <h3 className="font-semibold text-lg">Core Skills</h3>
              <p>{cvData.coreSkills}</p>
            </div>
          </div>
          {/* Main Content */}
          <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
            <div className="mb-4">
              <label className="font-bold mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={cvData.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Marital Status</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={cvData.maritalStatus}
                onChange={(e) => handleInputChange(e, "maritalStatus")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={cvData.contact.email}
                onChange={(e) => handleInputChange(e, "contact", "email")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Phone</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={cvData.contact.phone}
                onChange={(e) => handleInputChange(e, "contact", "phone")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Address</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={cvData.contact.address}
                onChange={(e) => handleInputChange(e, "contact", "address")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Permanent Address</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={cvData.contact.permanentAddress}
                onChange={(e) => handleInputChange(e, "contact", "permanentAddress")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Facebook</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={cvData.socialMedia.facebook}
                onChange={(e) => handleInputChange(e, "socialMedia", "facebook")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">LinkedIn</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={cvData.socialMedia.linkedin}
                onChange={(e) => handleInputChange(e, "socialMedia", "linkedin")}
              />
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Objective</label>
              <textarea
                className="w-full p-2 border rounded"
                value={cvData.objective}
                onChange={(e) => handleInputChange(e, "objective")}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Education</label>
              <textarea
                className="w-full p-2 border rounded"
                value={cvData.education}
                onChange={(e) => handleInputChange(e, "education")}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Work Experience</label>
              <textarea
                className="w-full p-2 border rounded"
                value={cvData.workExperience}
                onChange={(e) => handleInputChange(e, "workExperience")}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Core Skills</label>
              <textarea
                className="w-full p-2 border rounded"
                value={cvData.coreSkills}
                onChange={(e) => handleInputChange(e, "coreSkills")}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Extra Curriculum</label>
              <textarea
                className="w-full p-2 border rounded"
                value={cvData.extraCurriculum}
                onChange={(e) => handleInputChange(e, "extraCurriculum")}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="font-bold mb-2">Career Summary</label>
              <textarea
                className="w-full p-2 border rounded"
                value={cvData.careerSummary}
                onChange={(e) => handleInputChange(e, "careerSummary")}
              ></textarea>
            </div>
          </div>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={downloadCv}
        >
          Download CV
        </button>
      </div>
    </>

  );
}
