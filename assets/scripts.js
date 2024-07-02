// script.js
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
            { text: "Creating portfolio environment on AWS EC2...", duration: 2000 },
            { text: "Provisioning infrastructure with Terraform...", duration: 3000 },
            { text: "Installing Jenkins and configuring pipeline...", duration: 2000 },
            { text: "Jenkins setup complete. Running initial tests...", duration: 2500 },
            { text: "Stage 1: Checkout git repo and pull work directory...", duration: 2000 },
            { text: "Running security scans with OWASP ZAP...", duration: 3000 },
            { text: "Security scans passed. Running code quality checks with SonarQube...", duration: 2500 },
            { text: "SonarQube analysis complete. Quality gates passed.", duration: 2000 },
            { text: "Stage 2: Deploying application to Kubernetes cluster...", duration: 3000 },
            { text: "Setting up load balancers and DNS configuration...", duration: 2500 },
            { text: "Deployment successful. Opening portfolio website on port 80...", duration: 2000 }
        ];

        let stepIndex = 0;
        let progress = 0;
        const totalSteps = steps.length;

        function displayNextStep() {
            if (stepIndex < totalSteps) {
                const step = steps[stepIndex];
                terminal.innerHTML += `<div>${step.text}</div>`;
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
        fetch('index.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                portfolioContent.innerHTML = data;
                portfolioContent.style.display = 'block';
                terminal.style.display = 'none';
                progressBar.style.display = 'none';
            })
            .catch(error => {
                terminal.innerHTML += `<div>Error loading portfolio content: ${error}</div>`;
            });
    }
});
