import io.javalin.Javalin
import io.javalin.http.staticfiles.Location

fun main() {
    val app = Javalin.create {config ->
        config.addStaticFiles("/public", Location.CLASSPATH)
    }.start()
    //
    /*app.get("/" ) { ctx ->
        println(ctx.ip())
        println(ctx.userAgent())
        ctx.html("<h1>Hola Mundo</h1>")
    }
*/
}