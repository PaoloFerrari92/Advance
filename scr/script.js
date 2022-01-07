let weather = {
  fetchWeather: function (city) {
    fetch("https://api.teleport.org/api/urban_areas/slug:" + city + "/scores/")
      .then((response) => {
        if (!response.ok) {
          alert("No City found.");
          throw new Error("No City found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const mainCategory = data.categories[0];

    const { teleport_city_score } = data;
    const { summary } = data;
    document.querySelector(".city").innerText =
      "Total score = " +
      Math.round(teleport_city_score * 100 + Number.EPSILON) / 100;
      
   
    
    document.querySelector(".sumary").innerText = summary.replace(/(<([^>]+)>)/gi, "");

    const { categories } = data;
    const categoriesStrings = [];
    categories.forEach(({ name, score_out_of_10 }) => {
      categoriesStrings.push("Categories =  " + name + ", score = " + Math.round(score_out_of_10 * 100 + Number.EPSILON) / 100);
    });

    document.querySelector(".categorie").innerText =
        categoriesStrings.join(" \n");

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + mainCategory.name + "')";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});


