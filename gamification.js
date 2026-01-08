// Sistema de Gamificación con LocalStorage
// 100% gratuito, funciona sin backend

class GamificationSystem {
    constructor() {
        this.achievements = [
            { id: 'first_sorting', name: 'Primera Selección', description: 'Completa tu primer quiz de casa', icon: '🎓', points: 50 },
            { id: 'share_result', name: 'Compartir es Cuidar', description: 'Comparte tu resultado', icon: '📤', points: 25 },
            { id: 'try_all_quizzes', name: 'Estudiante Completo', description: 'Prueba todos los quizzes disponibles', icon: '📚', points: 200 },
            { id: 'loyal_student', name: 'Estudiante Leal', description: 'Regresa 3 días diferentes', icon: '⭐', points: 100 },
            { id: 'perfect_score', name: 'Determinación Pura', description: 'Obtén 100% en una casa', icon: '💯', points: 150 },
            { id: 'explorer', name: 'Explorador Mágico', description: 'Descubre todas las casas', icon: '🗺️', points: 75 },
            { id: 'social_wizard', name: 'Mago Social', description: 'Comparte en 3 plataformas diferentes', icon: '🌟', points: 100 },
            { id: 'night_owl', name: 'Búho Nocturno', description: 'Completa un quiz entre 12am y 6am', icon: '🦉', points: 50 }
        ];
        this.loadProfile();
    }

    loadProfile() {
        const saved = localStorage.getItem('wizardProfile');
        if (saved) {
            this.profile = JSON.parse(saved);
        } else {
            this.profile = {
                userId: this.generateUserId(),
                createdAt: new Date().toISOString(),
                lastVisit: new Date().toISOString(),
                visitDays: [new Date().toISOString().split('T')[0]],
                quizzesTaken: [],
                houses: [],
                achievements: [],
                totalPoints: 0,
                shareCount: 0,
                sharePlatforms: []
            };
            this.saveProfile();
        }
        this.updateLastVisit();
    }

    generateUserId() {
        return 'wizard_' + Math.random().toString(36).substr(2, 9) + Date.now();
    }

    saveProfile() {
        localStorage.setItem('wizardProfile', JSON.stringify(this.profile));
    }

    updateLastVisit() {
        const today = new Date().toISOString().split('T')[0];
        if (!this.profile.visitDays.includes(today)) {
            this.profile.visitDays.push(today);
        }
        this.profile.lastVisit = new Date().toISOString();
        this.saveProfile();
    }

    recordQuizCompletion(quizType, result) {
        const quiz = {
            type: quizType,
            result: result,
            timestamp: new Date().toISOString()
        };
        this.profile.quizzesTaken.push(quiz);

        // Registrar casa si es el quiz de casas
        if (quizType === 'house' && !this.profile.houses.includes(result)) {
            this.profile.houses.push(result);
        }

        // Verificar achievements
        this.checkAchievements(quizType, result);
        this.saveProfile();
    }

    checkAchievements(quizType, result) {
        const newAchievements = [];

        // Primera selección
        if (!this.hasAchievement('first_sorting') && quizType === 'house') {
            newAchievements.push(this.unlockAchievement('first_sorting'));
        }

        // Estudiante completo (todos los quizzes)
        const quizTypes = [...new Set(this.profile.quizzesTaken.map(q => q.type))];
        if (!this.hasAchievement('try_all_quizzes') && quizTypes.length >= 3) {
            newAchievements.push(this.unlockAchievement('try_all_quizzes'));
        }

        // Estudiante leal (3 días diferentes)
        if (!this.hasAchievement('loyal_student') && this.profile.visitDays.length >= 3) {
            newAchievements.push(this.unlockAchievement('loyal_student'));
        }

        // Explorador (todas las casas)
        if (!this.hasAchievement('explorer') && this.profile.houses.length >= 4) {
            newAchievements.push(this.unlockAchievement('explorer'));
        }

        // Búho nocturno (12am - 6am)
        const hour = new Date().getHours();
        if (!this.hasAchievement('night_owl') && hour >= 0 && hour < 6) {
            newAchievements.push(this.unlockAchievement('night_owl'));
        }

        return newAchievements;
    }

    hasAchievement(achievementId) {
        return this.profile.achievements.some(a => a.id === achievementId);
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement && !this.hasAchievement(achievementId)) {
            const unlockedAchievement = {
                ...achievement,
                unlockedAt: new Date().toISOString()
            };
            this.profile.achievements.push(unlockedAchievement);
            this.profile.totalPoints += achievement.points;
            this.saveProfile();
            this.showAchievementNotification(achievement);
            return achievement;
        }
        return null;
    }

    recordShare(platform) {
        this.profile.shareCount++;
        if (!this.profile.sharePlatforms.includes(platform)) {
            this.profile.sharePlatforms.push(platform);
        }

        // Achievement por compartir
        if (!this.hasAchievement('share_result')) {
            this.unlockAchievement('share_result');
        }

        // Achievement por compartir en 3 plataformas
        if (!this.hasAchievement('social_wizard') && this.profile.sharePlatforms.length >= 3) {
            this.unlockAchievement('social_wizard');
        }

        this.saveProfile();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h3>¡Logro Desbloqueado!</h3>
                    <p><strong>${achievement.name}</strong></p>
                    <p>${achievement.description}</p>
                    <p class="achievement-points">+${achievement.points} puntos</p>
                </div>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    getStats() {
        return {
            totalQuizzes: this.profile.quizzesTaken.length,
            totalPoints: this.profile.totalPoints,
            achievementsUnlocked: this.profile.achievements.length,
            totalAchievements: this.achievements.length,
            visitDays: this.profile.visitDays.length,
            houses: this.profile.houses
        };
    }

    displayAchievements(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const newAchievements = this.profile.achievements.filter(a => {
            const unlocked = new Date(a.unlockedAt);
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            return unlocked > fiveMinutesAgo;
        });

        if (newAchievements.length > 0) {
            container.innerHTML = '<h3 style="margin-top: 30px;">🏆 Logros Desbloqueados</h3>';
            newAchievements.forEach(achievement => {
                const achievementEl = document.createElement('div');
                achievementEl.className = 'achievement-badge';
                achievementEl.innerHTML = `
                    <span class="achievement-icon">${achievement.icon}</span>
                    <div class="achievement-details">
                        <strong>${achievement.name}</strong>
                        <small>${achievement.description} (+${achievement.points} pts)</small>
                    </div>
                `;
                container.appendChild(achievementEl);
            });
        }
    }
}

// Instancia global
const gamification = new GamificationSystem();

// Mostrar stats en consola (debug)
console.log('📊 Estadísticas del Mago:', gamification.getStats());
