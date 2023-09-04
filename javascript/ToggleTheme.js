class ToggleTheme {
  constructor(buttonId) {
    this.trigger = document.getElementById(buttonId);
    this.root = document.documentElement;
    this.style = document.documentElement.style;
    
    // Bind the toggleTheme function to the class instance
    this.toggleTheme = this.toggleTheme.bind(this);

    // Add a click event listener to the button
    this.trigger.addEventListener("click", this.toggleTheme);
  }

  toggleTheme() {
    const currentTheme = this.root.getAttribute("data-theme");

    if (currentTheme === "light") {
      // Switch to dark theme
      this.style.setProperty("--background", "hsl(235, 21%, 11%)");
      this.style.setProperty("--element-background", "hsl(235, 24%, 19%)");
      this.style.setProperty("--text-main", "hsl(236, 33%, 92%)");
      this.style.setProperty("--text-mid", "hsl(234, 11%, 52%)");
      this.style.setProperty("--text-thin", "hsl(233, 14%, 35%)");
      this.root.setAttribute("data-theme", "dark");
    } else {
      // Switch to light theme (default)
      this.style.setProperty("--background", "hsl(236, 33%, 92%)");
      this.style.setProperty("--element-background", "hsl(0, 0%, 98%)");
      this.style.setProperty("--text-main", "hsl(235, 19%, 35%)");
      this.style.setProperty("--text-mid", "hsl(236, 9%, 61%)");
      this.style.setProperty("--text-thin", "hsl(0, 0%, 76%)");
      this.root.setAttribute("data-theme", "light");
    }
  }
}

export default ToggleTheme;
