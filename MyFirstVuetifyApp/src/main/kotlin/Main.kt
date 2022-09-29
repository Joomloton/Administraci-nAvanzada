import io.javalin.Javalin
import io.javalin.http.staticfiles.Location
import io.javalin.plugin.rendering.vue.VueComponent

fun main() {
    val app = Javalin.create { config ->
        config.addStaticFiles("/public", Location.CLASSPATH)
        config.enableWebjars()
    }.start()

    app.get("/", VueComponent("home-page"))
    app.get("/crud", VueComponent("crud-page"))
    app.get("/misc", VueComponent("misc-page"))
    app.get("/grouping", VueComponent("grouping-page"))
    app.get("/search", VueComponent("search-page"))
}
