// Analytics y Tracking - 100% Gratuito
// Preparado para Google Analytics 4, Microsoft Clarity, etc.

class AnalyticsManager {
    constructor() {
        this.isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
        this.initializeTracking();
    }

    initializeTracking() {
        // Google Analytics 4 - PLACEHOLDER
        // Para activar: Crea cuenta en analytics.google.com y reemplaza 'G-XXXXXXXXXX' con tu ID
        /*
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
        */

        // Microsoft Clarity - PLACEHOLDER (100% GRATIS)
        // Para activar: Crea cuenta en clarity.microsoft.com y reemplaza 'XXXXXXXXXX'
        /*
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "XXXXXXXXXX");
        */

        console.log('📊 Analytics ready. Tracking:', this.isProduction ? 'Enabled' : 'Disabled (localhost)');
    }

    trackEvent(eventName, eventParams = {}) {
        if (!this.isProduction) {
            console.log('📊 Event:', eventName, eventParams);
            return;
        }

        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventParams);
        }

        // Puedes agregar otros servicios aquí
    }

    // Eventos predefinidos del quiz
    trackQuizStart(quizType) {
        this.trackEvent('quiz_started', {
            quiz_type: quizType,
            timestamp: new Date().toISOString()
        });
    }

    trackQuizCompleted(quizType, result, timeSpent) {
        this.trackEvent('quiz_completed', {
            quiz_type: quizType,
            result: result,
            time_spent_seconds: timeSpent,
            timestamp: new Date().toISOString()
        });
    }

    trackQuestionAnswered(questionNumber, answer) {
        this.trackEvent('question_answered', {
            question_number: questionNumber,
            answer: answer
        });
    }

    trackShare(platform, quizType, result) {
        this.trackEvent('result_shared', {
            platform: platform,
            quiz_type: quizType,
            result: result
        });
    }

    trackAchievement(achievementId, achievementName) {
        this.trackEvent('achievement_unlocked', {
            achievement_id: achievementId,
            achievement_name: achievementName
        });
    }

    trackAffiliateClick(productType, productId) {
        this.trackEvent('affiliate_click', {
            product_type: productType,
            product_id: productId
        });
    }

    trackAdView(adPosition) {
        this.trackEvent('ad_viewed', {
            ad_position: adPosition
        });
    }

    trackEmailSubscribe(quizType) {
        this.trackEvent('email_subscribed', {
            quiz_type: quizType,
            timestamp: new Date().toISOString()
        });
    }

    // Tracking de engagement
    trackTimeOnPage() {
        const startTime = Date.now();

        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            this.trackEvent('page_time', {
                time_spent_seconds: timeSpent
            });
        });
    }

    // Tracking de errores
    trackError(error, context) {
        this.trackEvent('error_occurred', {
            error_message: error.message,
            error_stack: error.stack,
            context: context
        });
    }
}

// Instancia global
const analytics = new AnalyticsManager();

// Iniciar tracking de tiempo en página
analytics.trackTimeOnPage();

// Error tracking automático
window.addEventListener('error', (event) => {
    analytics.trackError(event.error, 'Global error handler');
});

console.log('📊 Analytics manager initialized');
