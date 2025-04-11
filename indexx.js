document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        let input = inputField.value;
        inputField.value = "";
        output(input);
      }
    });
  });
  
  function normalizeTurkishCharacters(text) {
    const turkishChars = {
      'ç': 'c', 'ı': 'i', 'ğ': 'g', 'ö': 'o', 'ş': 's', 'ü': 'u',
      'Ç': 'C', 'İ': 'I', 'Ğ': 'G', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
    };
  
    // Türkçe özel harfleri İngilizce karşılıklarıyla değiştir
    return text.replace(/[çğıöşüÇĞÖŞÜı]/g, match => turkishChars[match] || match);
  }
  
  function output(input) {
    let product;
  
    // İlk olarak metni normalleştir
    let text = normalizeTurkishCharacters(input.toLowerCase())
               .replace(/[^\w\s]/gi, "")
               .replace(/[\d]/gi, "")
               .trim();
    
    // Türkçe dil kurallarına uygun bazı düzeltmeler
    text = text
      .replace(/ bir /g, " ")   // 'bir hikaye anlat' -> 'hikaye anlat'
      .replace(/teşekkür ederim/g, "rica ederim")
      .replace(/nasılsın/g, "sen nasılsın")
      .replace(/ne yapabilirim/g, "neler yapabilirim")
      .replace(/merhaba/g, "selam")
      .replace(/lütfen /g, "")
      .replace(/ teşekkürler/g, "")
      .replace(/nereye/g, "nerede");
  
    if (compare(prompts, replies, text)) {
      // Eğer promptlar ile eşleşme varsa, cevabı al
      product = compare(prompts, replies, text);
    } else if (text.match(/tesekkur ederim|tesekkurler|sagolun|sagol|tsk ederim|tsk/gi)) {
      product = "Rica ederim, iyi çalışmalar";
    }
    else if (text.match(/merhaba|selam|merhabalar|selamlar/gi)) {
      product = "Merhabalar";
    }
     else if (text.match(/nasilsin|nasilsiniz/gi)) {
      product = "İyiyim teşekkür ederim, siz nasılsınız?";
    }
       else if (text.match(/tesekkürler|tesekkür ederim|tsk|sagol|sagolasın/gi)) {
      product = "Rica ederim :)";
    }
    else if (text.match(/iyi calismalar|kolay gelsin/gi)) {
      product = "Teşekkürler, size de";
    }
      else if (text.match(/inisiyatif pk|insiyatif pk|insiyatif|inisiyatif/gi)) {
      product = "Konu ile ilgili soru ve taleplerinizi VIT “İş Talep Girişi“ ekranından kategori sekmesinden “Performans Yönetimi”, alt kategori sekmesinden “Perfo Destek” başlığını seçerek iletmenizi rica ederiz.";
    }
    else if (text.match(/5. performans primi|performans primi|5.performans primi/gi)) {
      product = "Merhaba, İskender Yılmaz ile iletişime geçebilir misiniz";
    }
    else if (text.match(/fazla mesai|mesai/gi)) {
      product = "Merhaba, Osman Kılıç ile iletişime geçebilir misiniz";
    }
    else if (text.match(/gulseli/gi)) {
      product = "Performans Yönetimi Müdürlüğü'nde çalışır ve Üsküdar'da oturur";
    }
      else if (text.match(/sap|sap bo|SAP|SAP BO/gi)) {
      product = "Merhaba, Ekrem Ercan Kuşluoğlu (Bekir) ile iletişime geçebilir misiniz";
    }
      else if (text.match(/tamamdir|tamam/gi)) {
      product = ":)";
    }
       else if (text.match(/erken yulselme|yukselme sinavi|yukselme/gi)) {
      product = "Merhaba, Kariyer Yönetimi ve Çalışan Deneyimi Müdürlüğü ile iletişime geçebilir misiniz";
    }
      else if (text.match(/DDKM/gi)) {
      product = "Merhaba, İlgili konu hususunda takım hedeflerini Bireysel Bankacılık Satış Koordinasyon Müdürlüğü vermektedir. Konuyla alakalı, ilgili müdürlükle iletişime geçebilirsiniz";
    }
     else if (text.match(/erken yukselme|yukselme|yukselme sinavi/gi)) {
      product = "Merhaba, Kariyer Yönetimi ve Çalışan Deneyimi Müdürlüğü ile iletişime geçebilir misiniz";
    }
    else if (text.match(/omer koray|koray bey|koray/gi)) {
      product = "Performans Yönetimi Müdürlüğü'nde çalışır ve kısaltması ÖKE'dir";
    }
    else if (text.match(/sube ankes|atm ankes|ankes/gi)) {
      product = "Merhaba, Furkan Şencan ile iletişime geçebilir misiniz";
    }
    else if (text.match(/(sigorta|tesvik|kazandiran)/gi)) {
      // Sigorta ve teşvik kelimeleriyle ilgili özel cevap
      product = sigorta[Math.floor(Math.random() * sigorta.length)];
    } else if (text.match(/(pk|PK|ölçek PK|prim katsayısı|birlikte bakabilir miyiz|yansimadi|yansimiyor|yansimamistir)/gi)) {
      // Sigorta ve teşvik kelimeleriyle ilgili özel cevap
      product = perfo[Math.floor(Math.random() * perfo.length)];
    } else {
      // Eğer eşleşme yoksa, alternatif cevaplardan rastgele birini seç
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }
  
    // DOM'u güncelle
    addChat(input, product);
  }
  
  function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          break;
        }
      }
      if (replyFound) {
        break;
      }
    }
    return reply;
  }
  
  function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");
  
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
    messagesContainer.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    let botImg = document.createElement("img");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botImg.src = "robot_face_prev_ui.png";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = "...";
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
  
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
    // Gerçekçi bir gecikme simülasyonu
    setTimeout(() => {
      botText.innerText = `${product}`;
      textToSpeech(product);
    }, 2000);
  }
  