/**
 * Tzar Bomb Visualization Block
 * Creates an animated explosion effect when triggered
 */

export default function decorate(block) {
  // Clear existing content
  block.textContent = '';

  // Create container
  const container = document.createElement('div');
  container.className = 'tzar-bomb-container';

  // Create info panel
  const infoPanel = document.createElement('div');
  infoPanel.className = 'info-panel';
  infoPanel.innerHTML = `
    <h3>Tsar Bomba Visualization</h3>
    <p>Click the button to trigger the animation</p>
    <p>The largest nuclear device ever detonated (50 megatons)</p>
  `;
  container.appendChild(infoPanel);

  // Create detonation counter
  const counter = document.createElement('div');
  counter.className = 'counter';
  let detonationCount = 0;
  counter.textContent = `Detonations: ${detonationCount}`;
  container.appendChild(counter);

  // Create the detonation button
  const button = document.createElement('button');
  button.className = 'tzar-bomb-button';
  button.textContent = 'DETONATE';
  container.appendChild(button);

  // Animation function
  function triggerExplosion(e) {
    // Increment counter
    detonationCount += 1;
    counter.textContent = `Detonations: ${detonationCount}`;

    // Get click position
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create main explosion wave
    const explosionWave = document.createElement('div');
    explosionWave.className = 'explosion-wave';
    explosionWave.style.left = `${x}px`;
    explosionWave.style.top = `${y}px`;
    container.appendChild(explosionWave);

    // Trigger explosion animation
    setTimeout(() => {
      explosionWave.classList.add('active');
    }, 10);

    // Create shockwave rings
    for (let i = 0; i < 3; i += 1) {
      setTimeout(() => {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave-ring';
        shockwave.style.left = `${x}px`;
        shockwave.style.top = `${y}px`;
        container.appendChild(shockwave);

        setTimeout(() => {
          shockwave.classList.add('active');
        }, 10);

        // Remove after animation
        setTimeout(() => {
          shockwave.remove();
        }, 2000);
      }, i * 200);
    }

    // Create particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i += 1) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      // Random angle and distance
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const distance = 200 + Math.random() * 300;

      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);

      container.appendChild(particle);

      setTimeout(() => {
        particle.classList.add('active');
      }, Math.random() * 300);

      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, 2000);
    }

    // Screen shake effect
    container.classList.add('screen-shake');
    setTimeout(() => {
      container.classList.remove('screen-shake');
    }, 500);

    // Flash effect
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.8) 0%, transparent 70%)`;
    flash.style.pointerEvents = 'none';
    flash.style.opacity = '1';
    flash.style.transition = 'opacity 0.3s ease-out';
    container.appendChild(flash);

    setTimeout(() => {
      flash.style.opacity = '0';
    }, 50);

    setTimeout(() => {
      flash.remove();
    }, 350);

    // Remove explosion wave after animation
    setTimeout(() => {
      explosionWave.remove();
    }, 3000);

    // Disable button briefly to prevent spam
    button.disabled = true;
    button.style.opacity = '0.5';
    setTimeout(() => {
      button.disabled = false;
      button.style.opacity = '1';
    }, 500);
  }

  // Add click event listener
  button.addEventListener('click', triggerExplosion);

  // Also allow clicking anywhere in the container
  container.addEventListener('click', (e) => {
    if (e.target === container) {
      triggerExplosion(e);
    }
  });

  // Add keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      const fakeEvent = {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      };
      triggerExplosion(fakeEvent);
    }
  });

  // Append container to block
  block.appendChild(container);

  // Add some educational information
  const educationalInfo = document.createElement('div');
  educationalInfo.style.padding = '20px';
  educationalInfo.style.background = '#f5f5f5';
  educationalInfo.style.borderRadius = '10px';
  educationalInfo.style.marginTop = '20px';
  educationalInfo.innerHTML = `
    <h2>About the Tsar Bomba</h2>
    <p>The Tsar Bomba (Russian: Царь-бомба), also known as Big Ivan, was the most powerful nuclear weapon ever created and tested. Developed by the Soviet Union, it was detonated on October 30, 1961, over Novaya Zemlya archipelago in the Arctic Ocean.</p>
    <ul>
      <li><strong>Yield:</strong> 50 megatons (originally designed for 100 megatons)</li>
      <li><strong>Blast radius:</strong> Total destruction within 35 km radius</li>
      <li><strong>Mushroom cloud:</strong> Reached 65 km in height</li>
      <li><strong>Seismic magnitude:</strong> 5.25 on the Richter scale</li>
    </ul>
    <p>This visualization is purely educational and artistic, representing the scale of the explosion through animation.</p>
  `;
  block.appendChild(educationalInfo);
}
