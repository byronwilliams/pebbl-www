(function() {
    var timeout = null;

    function UCImage(element) {
        this._element = element;
        this._urlParts = [];

        this.scale_crop = function(x, y, center) {
            var ps = ["-", "scale_crop", x + "x" + y];

            if(center) {
                ps.push("center");
            }

            this._urlParts = this._urlParts.concat(ps);

            return this;
        }

        this.stretch = function(mode) {
            var ps = ["-", "stretch", mode];
            this._urlParts = this._urlParts.concat(ps);

            return this;
        }

        this.resize = function(x, y) {
            var ps = ["-", "resize", (x || "") + "x" + (y || "")];
            this._urlParts = this._urlParts.concat(ps);

            return this;
        }

        this.set = function() {
            var curSrc = this._element.getAttribute("src");
            var parts = curSrc.split("/");
            var title = parts.pop();

            parts = parts.concat(this._urlParts);
            parts.push(title);

            this._element.setAttribute("src", parts.join("/"));
        }
    }

    function resizeImages() {
        var es = document.getElementsByTagName("img");

        for(var i = 0; i < es.length; i += 1) {
            var element=es[i];
            var isUCImage = (element.getAttribute("src").indexOf("ucarecdn") > -1);

            if(isUCImage) {
                var inner = element.parentElement;
                var roundTo = 10; // (inner.clientWidth <= 640 ? 10 : 50);
                var width = Math.ceil(inner.clientWidth / roundTo) * roundTo;
                // console.log(inner, roundTo, width);
                var img = new UCImage(element);

                if(element.hasAttribute("data-max-height")) {
                    img.scale_crop(width, element.getAttribute("data-max-height"), element.hasAttribute("data-center"));
                }

                if(element.hasAttribute("data-full-width")) {
                    img.stretch("fill").resize(width);
                }

                if(element.hasAttribute("data-fit-width")) {
                    img.resize(width, null);
                }

                img.set()

                // element.setAttribute("width", width + "px");
                // element.setAttribute("src", img.getUrl("title.jpg"));

                // if(element.hasAttribute("data-with-link")) {
                //     var a = document.createElement("a");
                //     a.setAttribute("href", img._urlParts[0] + "/" + uuid + "/img.jpg");
                //     a.appendChild(element.cloneNode())

                //     element.parentElement.replaceChild(a, element);
                // }
            }
        }
    }

    resizeImages();
})();
