document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('startButton');
    const terminal = document.getElementById('terminal');
    const popup = document.getElementById('popup');
    const progressBar = document.getElementById('progress');
    const portfolioContent = document.getElementById('portfolio-content');

    startButton.addEventListener('click', function() {
        popup.style.display = 'none';
        runDeployment();
    });

    function runDeployment() {
        const steps = [
            { text: "Creating portfolio environment on AWS EC2...", duration: 1000 },
            { text: "Provisioning infrastructure with Terraform...", duration: 1500 },
            { text: "Installing Jenkins and configuring pipeline...", duration: 1000 },
            { text: "Jenkins setup complete. Running initial tests...", duration: 500 },
            { text: "Stage 1: Checkout git repo and pull work directory...", duration: 500 },
            { text: "Running security scans with OWASP ZAP...", duration: 1000 },
            { text: "Security scans passed. Running code quality checks with SonarQube...", duration: 1000 },
            { text: "SonarQube analysis complete. Quality gates passed.", duration: 1000 },
            { text: "Stage 2: Deploying application to Kubernetes cluster...", duration: 1000 },
            { text: "Setting up load balancers and DNS configuration...", duration: 1000 },
            { text: "Deployment successful. Opening portfolio website on port 80...", duration: 1000 }
        ];

        let stepIndex = 0;
        let progress = 0;
        const totalSteps = steps.length;

        function displayNextStep() {
            if (stepIndex < totalSteps) {
                const step = steps[stepIndex];
                terminal.innerHTML += `<div>ubuntu@ip-10-0-0-6:~$ ${step.text}</div>`;
                terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom
                progress = ((stepIndex + 1) / totalSteps) * 100;
                progressBar.style.width = progress + '%';
                stepIndex++;
                setTimeout(displayNextStep, step.duration);
            } else {
                loadPortfolioContent();
            }
        }

        displayNextStep();
    }

    function loadPortfolioContent() {
        // Attempt to redirect to the portfolio content
        window.location.href = './assets/index.html';
    }
});
