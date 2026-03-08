const handleCopyProfile = async () => {
    let titleText = 'My Kinky Map';
    if (myName && partnerName) {
      titleText = `${myName} & ${partnerName}'s Kinky Map`;
    } else if (myName) {
      titleText = `${myName}'s Kinky Map`;
    }
    
    let text = `         🗺️ 😈 ${titleText} 😈 🗺️\n\n`;

    const formatIdentity = (name: string, id: IdentityState, defaultTitle: string) => {
      if (!id.gender && !id.pronouns && !id.orientation && !id.relationship) return "";
      
      const title = name ? `${name.toUpperCase()}'S IDENTITY` : defaultTitle;
      let section = `        ❖ ── ${title} ── ❖\n`;
      if (id.pronouns) section += `🗣️ Pronouns: ${id.pronouns}\n`;
      if (id.gender) section += `👤 Gender: ${id.gender}\n`;
      if (id.orientation) section += `🌈 Orientation: ${id.orientation}\n`;
      if (id.relationship) section += `🔗 Dating: ${id.relationship}\n`;
      return section + `\n`;
    };

    text += formatIdentity(myName, meIdentity, 'MY IDENTITY');
    text += formatIdentity(partnerName, partnerIdentity, 'PARTNER IDENTITY');

    text += "        ❖ ── KINK PREFERENCES ── ❖\n";

    const getScoreEmoji = (val: number | undefined) => {
      if (val === -2) return "🔴";
      if (val === -1) return "🟠";
      if (val === 1) return "🟡";
      if (val === 2) return "🟢";
      return "⚪"; 
    };

    if (bothHavePreferences) {
      const n1 = myName ? myName.toUpperCase() : "ME";
      const n2 = partnerName ? partnerName.toUpperCase() : "PARTNER";
      const namesLine = `( ${n1} | ${n2} )`;
      
      const padding = Math.max(0, 21 - Math.floor(namesLine.length / 2));
      text += " ".repeat(padding) + namesLine + "\n\n";

      PREFERENCE_CATEGORIES.forEach(category => {
        let hasItems = false;
        let catText = `✦ ${category.name.toUpperCase()} ✦\n`;

        category.items.forEach(item => {
          const val1 = myPreferences[item.key];
          const val2 = partnerPreferences[item.key];
          
          if ((val1 !== undefined && val1 !== 0) || (val2 !== undefined && val2 !== 0)) {
            const e1 = getScoreEmoji(val1);
            const e2 = getScoreEmoji(val2);
            catText += `  ↳ ${e1} | ${e2}  ${item.label}\n`;
            hasItems = true;
          }
        });

        if (hasItems) {
          text += catText + '\n';
        }
      });
    } else {
      text += `\n`;
      PREFERENCE_CATEGORIES.forEach(category => {
        const allHard = category.items.every(item => myPreferences[item.key] === -2);
        if (allHard) return; 

        let catText = `✦ ${category.name.toUpperCase()} ✦\n`;
        let hasItems = false;

        category.items.forEach(item => {
          const val = myPreferences[item.key];
          if (val !== undefined && val !== 0) { 
            const e1 = getScoreEmoji(val);
            catText += `  ↳ ${e1}  ${item.label}\n`;
            hasItems = true;
          }
        });

        if (hasItems) {
          text += catText + '\n';
        }
      });
    }

    try {
      const getFooter = (url: string) => text + `──────────────────────\n🔗 Compare maps with me here:\n${url}`;

      if (navigator.clipboard && (window as any).ClipboardItem) {
        const textBlobPromise = getShareableUrl().then(url => 
          new Blob([getFooter(url)], { type: 'text/plain' })
        );
        
        await navigator.clipboard.write([
          new (window as any).ClipboardItem({
            'text/plain': textBlobPromise
          })
        ]);
        
        toast({
          title: "Profile Copied!",
          description: "Your map text is ready to share.",
        });
        return;
      }

      const url = await getShareableUrl();
      const finalText = getFooter(url);

      const copyToClipboardFallback = (copyText: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = copyText;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {}
        textArea.remove();
      };

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(finalText);
        } catch (err) {
          copyToClipboardFallback(finalText);
        }
      } else {
        copyToClipboardFallback(finalText);
      }

      toast({
        title: "Profile Copied!",
        description: "Your map text is ready to share.",
      });
    } catch (err) {
      console.error("Failed to copy text", err);
      toast({
        title: "Copy Failed",
        description: "Please try again or manually copy the text.",
        variant: "destructive",
      });
    }
  };
