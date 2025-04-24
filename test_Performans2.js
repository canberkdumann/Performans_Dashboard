let intro = document.querySelector('.intro')
let logo = document.querySelector('.logo-header')
let logoSpan = document.querySelectorAll('.logo')
let logoImage = document.querySelectorAll('.logo-image')
let logoFooterImage = document.querySelectorAll('.footer-logo-image')

window.addEventListener('DOMContentLoaded',()=>{ 

    setTimeout(() => {  
       function createSnowflakes() {
            const numFlakes = 100;  // Kar tanelerinin sayısı
            const colors = ['#ffffff', '#d4f1f9', '#e8f8ff']; 
    
            for (let i = 0; i < numFlakes; i++) {
                const flake = document.createElement('div');
                flake.classList.add('snowflake');
                flake.innerHTML = '❄'; 
                document.body.appendChild(flake);
    
                const size = Math.random() * 10 + 10 + 'px';
                flake.style.left = Math.random() * 100 + 'vw';
                flake.style.fontSize = size;
                flake.style.color = colors[Math.floor(Math.random() * colors.length)];
    
                // Animasyon süresini yavaşlatıyoruz, 2s ile 5s arasında rastgele bir süre
                flake.style.animationDuration = Math.random() * 3 + 2 + 's';  // 2s ile 5s arasında
                flake.style.animationDelay = Math.random() * 5 + 's';  // Kar tanelerinin rastgele başlama gecikmesi
            }
        }  
    
        createSnowflakes();
    
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });
    
        logoImage.forEach((img, idx) => {
            setTimeout(() => {
                img.classList.add('active');
            }, (idx + 1) * 400);
        });
    
        logoFooterImage.forEach((img, idx) => {
            setTimeout(() => {
                img.classList.add('active');
            }, (idx + 1) * 400);
        });
    
        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
    
            logoImage.forEach((img, idx) => {
                setTimeout(() => {
                    img.classList.remove('active');
                    img.classList.add('fade');
                }, (idx + 1) * 50);
            });
    
            logoFooterImage.forEach((img, idx) => {
                setTimeout(() => {
                    img.classList.remove('active');
                    img.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);
    
        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300);


             // Splash screen tamamlandığında "Anomali Raporu (PDF)" linkine yönlendir
             setTimeout(() => {
                const performanceReportLink = document.getElementById('performance-report-link');
                if (performanceReportLink) {
                    performanceReportLink.click();  // "Anomali Raporu" linkine tıklama simülasyonu
                }
            }, 2300);  // 2.3 saniye sonra yönlendirme
        
    });
})

// Sayfa yüklendikten sonra 3 saniye sonra yönlendirme yapılacak
window.onload = function() {
    window.onload = function() {
    
        // Yeni bir JavaScript dosyasını dinamik olarak yükleyelim
        const script = document.createElement('script');
        script.src = 'dashboard-template.js';  // Eklemek istediğiniz JS dosyasının yolu
        script.type = 'text/javascript';
        script.onload = function() {
            console.log("Additional script loaded dynamically!");
        };
        document.body.appendChild(script);
    };
   };



 // AJAX ile form verisini sunucuya gönderme
 function sendForm() {
    var form = new FormData();
    var message = document.querySelector('textarea[name="your-message"]').value;
    form.append("your-message", message);

    // AJAX isteği başlatılıyor
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/submit-form", true);  // Formu sunucuya göndereceğiniz URL'yi buraya yazın
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Form başarıyla gönderildi');
      }
    };
    xhr.send(form);  // Form verilerini gönder
  }

// config.json dosyasından email adresini dinamik olarak al
fetch('config.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('config.json yüklenemedi');
    }
    return response.json();
  })
  .then(config => {
    const email = config.contactEmail;

    // Email ile işlem yap (örnek: mailto ile yönlendir)
    document.getElementById("send-button").addEventListener("click", function () {
      const message = document.querySelector('textarea[name="your-message"]').value || "Mesaj girilmedi.";
      const subject = "İletişim Formu Mesajı";
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    });
  })
  .catch(error => {
    console.error("E-posta adresi yüklenemedi:", error);
  });

  

// config dosyasından URL'yi çek
fetch('config/config.json')
  .then(response => {
    if (!response.ok) throw new Error('Config dosyası yüklenemedi');
    return response.json();
  })
  .then(config => {
    const dashboardUrl = config.dashboardUrl;

    document.getElementById("performance-report-link").addEventListener("click", function(event) {
        event.preventDefault();

        const iframe = document.getElementById("report-iframe");
        const progressBar = document.getElementById("progress-bar");
        const progressBarFrame = document.getElementById("progress-bar-frame");
        const loadingText = document.getElementById("loading-text");

        loadingText.style.display = "block";
        progressBarFrame.style.display = "block";
        iframe.style.display = "none";

        // Güvenli şekilde src'yi ayarla
        iframe.src = dashboardUrl;

        const duration = 15000;
        const startTime = Date.now();

        function updateProgressBar() {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min((elapsedTime / duration) * 100, 100);
            progressBar.style.width = progress + "%";

            if (elapsedTime < duration) {
                requestAnimationFrame(updateProgressBar);
            }
        }

        requestAnimationFrame(updateProgressBar);

        iframe.style.position = "relative";
        iframe.style.top = "-90px";
        iframe.style.clipPath = "inset(90px 0 0 0)";

        iframe.onload = function() {
            setTimeout(() => {
                progressBarFrame.style.display = "none";
                loadingText.style.display = "none";
                iframe.style.display = "block";
            }, duration);
        };
    });
  })
  .catch(err => {
    console.error("Dashboard URL yüklenemedi:", err);
  });




var modal = document.getElementById("myModal");
        var btn = document.querySelector(".filter-drawer-toggle");
        var span = document.getElementsByClassName("close")[0];
    
        // Butona tıklama olayı ekleyin
        btn.onclick = function() {
            modal.style.display = "block"; // Modalı göster
        }
    
        // Kapatma butonuna tıklama olayı ekleyin
        span.onclick = function() {
            modal.style.display = "none"; // Modalı gizle
        }
    
        // Modal dışına tıklayınca modalı kapat
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none"; // Modalı gizle
            }
        }
		
		var modal1 = document.getElementById("myModal1");
        var btn1 = document.querySelector(".filter-drawer-toggle1");
        var span1 = document.getElementsByClassName("close1")[0];
    	
        // Butona tıklama olayı ekleyin
        btn1.onclick = function() {
            modal1.style.display = "block"; // Modalı göster
        }
    
        // Kapatma butonuna tıklama olayı ekleyin
        span1.onclick = function() {
            modal1.style.display = "none"; // Modalı gizle
        }
    
        // Modal dışına tıklayınca modalı kapat
        window.onclick = function(event) {
            if (event.target == modal1) {
                modal1.style.display = "none"; // Modalı gizle
            }
        }
			
		var modal2 = document.getElementById("myModal2");
        var btn2 = document.querySelector(".filter-drawer-toggle2");
        var span2 = document.getElementsByClassName("close2")[0];
    	
        // Butona tıklama olayı ekleyin
        btn2.onclick = function() {
            modal2.style.display = "block"; // Modalı göster
        }
    
        // Kapatma butonuna tıklama olayı ekleyin
        span2.onclick = function() {
            modal2.style.display = "none"; // Modalı gizle
        }
    
        // Modal dışına tıklayınca modalı kapat
        window.onclick = function(event) {
            if (event.target == modal2) {
                modal2.style.display = "none"; // Modalı gizle
            }
        }

        var root = this.root;
        $(document).ready(function() {
            $("#nav-drawer paper-menu paper-item").click(function() {
                var index = $(this).index();
                Polymer.dom(root).querySelector("iron-pages").selectIndex(index);
            });
            $("#nav-menu-button").click(function() {
                Polymer.dom(root).querySelector("#nav-drawer").togglePanel();
            });
            $(window).resize(function() {
                Polymer.updateStyles();
            });
        });
		
		
const profilePic = document.getElementById('user-profile');

// Fotoğrafı büyütmek için tıklama olayı
profilePic.addEventListener('click', function(event) {
    event.stopPropagation();  
    this.classList.toggle('enlarged'); 
});

// Sayfanın geri kalanına tıklanırsa, fotoğraf küçültülür
document.addEventListener('click', function() {
    profilePic.classList.remove('enlarged'); 
});



  const button = document.querySelector('.filter-drawer-toggle');
  const badge = document.getElementById('notification-badge');

  // İkona tıklandığında bildirim okundu kabul edilsin
  button.addEventListener('click', () => {
    // Badge'i gizlemek için display özelliğini 'none' yapıyoruz
    badge.style.display = 'none';
  });
  
  
  // JavaScript: Dropdown öğelerine tıklanma işlevi eklemek
document.querySelectorAll('.primary-navigation .dropdown a').forEach(function(item) {
  item.addEventListener('click', function(event) {
    // Tıklanan öğenin metnini al
    const selectedText = event.target.innerText;

    // Input'un değerini (value) güncelle
    document.getElementById('input').value = selectedText;
  });
});



// Dropdown öğelerini alfabetik olarak sıralamak için fonksiyon
function sortDropdownItems() {
  const dropdown = document.querySelector('.primary-navigation .dropdown');  // Dropdown menüsünü seç
  const items = Array.from(dropdown.getElementsByTagName('li'));  // Menu öğelerini al (li etiketleri)

  // Menu öğelerini alfabetik olarak sırala
  items.sort(function(a, b) {
    const textA = a.querySelector('a').innerText.toLowerCase();  // Öğenin metnini al ve küçük harfe çevir
    const textB = b.querySelector('a').innerText.toLowerCase();  // Öğenin metnini al ve küçük harfe çevir
    return textA.localeCompare(textB);  // Alfabetik sıralama
  });

  // Sıralanan öğeleri dropdown menüsüne yeniden ekle
  items.forEach(function(item) {
    dropdown.appendChild(item);  // Öğeyi sıralı olarak menüye ekle
  });
}

// Sayfa yüklendiğinde dropdown öğelerini sırala
window.addEventListener('load', sortDropdownItems);

let correctAnswer = 'C'; // Correct answer for this question

// Function to start the game and display the question
function startGame() {
 document.querySelector('.title2').style.display = 'none';
    // Hide the start button and show the question container
    document.querySelector('.start-button').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';

    // Set the question and options
    document.getElementById('question-text').textContent = "Aşağıdakilerden hangisi Bölge Kümülatif PK'da Bireysel Takım türü altındaki Kadranlarda en yüksek ağırlığa sahiptir?";
    document.querySelector('button[onclick="checkAnswer(\'A\')"]').textContent = "Kredi";
    document.querySelector('button[onclick="checkAnswer(\'B\')"]').textContent = "Kampanya";
    document.querySelector('button[onclick="checkAnswer(\'C\')"]').textContent = "Kaynak";
    document.querySelector('button[onclick="checkAnswer(\'D\')"]').textContent = "Verimlilik (A)";
}

let currentQuestionIndex = 0;
let answeredQuestions = {}; // Kullanıcının verdiği cevapları saklayan nesne
let correctAnswersCount = 0; // Doğru cevap sayısını tutacağız

// Sorular ve cevaplar
const questions = [
    {
        question: "Aşağıdakilerden hangisi Bölge Kümülatif PK'da Bireysel Takım türü altındaki Kadranlarda en yüksek ağırlığa sahiptir?",
        options: ["Kredi", "Kampanya", "Kaynak", "Verimlilik (A)"],
        correctAnswer: "C"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Seoul", "Beijing", "Bangkok"],
        correctAnswer: "A"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: "D"
    }
];

// Oyunu başlatan fonksiyon
function startGame() {
    document.querySelector('.title2').style.display = 'none';
    document.querySelector('.start-button').style.display = 'none';

    document.getElementById('question-container').style.display = 'block';

    loadQuestion(currentQuestionIndex);
}

// Soruyu yükleyen fonksiyon
function loadQuestion(index) {
    const question = questions[index];

    document.getElementById('question-text').textContent = question.question;

    // Şıkları güncelle ve önceki cevaplara göre butonları renklendir
    ['A', 'B', 'C', 'D'].forEach((option, i) => {
        const button = document.querySelector(`button[onclick="checkAnswer('${option}')"]`);
        button.textContent = `${option}) ${question.options[i]}`;
        button.style.backgroundColor = '';  // Varsayılan renge geri döndür
        button.style.color = '';  // Varsayılan yazı rengi

        // Eğer kullanıcı daha önce doğru cevap verdiyse, butonu yeşil yap
        if (answeredQuestions[index] === option) {
            button.style.backgroundColor = 'green';
            button.style.color = 'white';
        }
    });

    // Sonuç mesajının rengini sıfırla
    document.getElementById('result-message').style.display = 'none';

    // Geri butonunu kontrol et
    document.getElementById('prev-question').disabled = (index === 0);
    
    // İleri butonunu kontrol et
    document.getElementById('next-question').disabled = (index === questions.length - 1);

    // Eğer tüm sorular doğru cevaplandıysa, başarı mesajı göster
    if (currentQuestionIndex === questions.length - 1 && correctAnswersCount === questions.length) {
        document.getElementById('result-message').textContent = 'Tebrikler! Quiz tamamlandı 🎉';
        document.getElementById('result-message').style.color = 'green';
        document.getElementById('result-message').style.display = 'block';
    }
}

// Cevabı kontrol eden fonksiyon
function checkAnswer(option) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const selectedButton = document.querySelector(`button[onclick="checkAnswer('${option}')"]`);

    if (option === correctAnswer) {
        correctAnswersCount++; // Doğru cevap sayısını artırıyoruz
        document.getElementById('result-message').textContent = 'Doğru Cevap 🎉';
        document.getElementById('result-message').style.color = 'green';
        document.getElementById('result-message').style.display = 'block';

        selectedButton.style.backgroundColor = 'green';
        selectedButton.style.color = 'white';

        // Kullanıcının bu soruya verdiği doğru cevabı sakla
        answeredQuestions[currentQuestionIndex] = option;

        setTimeout(() => {
            document.getElementById('result-message').style.display = 'none';
            if (currentQuestionIndex === questions.length - 1) {
                if (correctAnswersCount === questions.length) {
                    document.getElementById('result-message').textContent = 'Tebrikler! Quiz tamamlandı 🎉';
                    document.getElementById('result-message').style.color = 'green';
                    document.getElementById('result-message').style.display = 'block';
                }
            } else {
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
            }
        }, 1000); // 1 saniye bekleme süresi
    } else {
        document.getElementById('result-message').textContent = 'Yanlış Cevap 😢';
        document.getElementById('result-message').style.color = 'red';
        document.getElementById('result-message').style.display = 'block';

        selectedButton.style.backgroundColor = 'red';
        selectedButton.style.color = 'white';

        setTimeout(() => {
            selectedButton.style.backgroundColor = '';  // Eski haline dönsün
            selectedButton.style.color = '';  // Eski haline dönsün
            document.getElementById('result-message').style.display = 'none';
        }, 1000); // 1 saniye içinde eski haline döner
    }
}

// İleri butonu fonksiyonu
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

// Geri butonu fonksiyonu
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}




