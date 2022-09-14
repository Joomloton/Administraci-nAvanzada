import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.7.10"
    application
}

group = "edu.uttt"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    // https://mvnrepository.com/artifact/io.javalin/javalin
    implementation("io.javalin:javalin:4.6.4")
    // https://mvnrepository.com/artifact/org.slf4j/slf4j-simple
    implementation("org.slf4j:slf4j-simple:2.0.0")


}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

tasks.withType<Jar>{
    manifest {
        attributes("Main-Class" to "MainKt")
    }
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
    from(configurations.runtimeClasspath.get()
        .onEach { println("add from dependencies: ${it.name}") }
    //.filter {it.name.endsWith("jar") }
        .map { if (it.isDirectory) it else zipTree(it) }) {
        exclude( "META-INF/INDEX.LIST", "META-INF/*.SF", "META-INF/*.DSA", "META-INF/*-RSA")
    }
    sourceSets.main.get()
        .allSource.forEach { println("add from sources: ${it.canonicalPath}") }
}

application {
    mainClass.set("MainKt")
}

