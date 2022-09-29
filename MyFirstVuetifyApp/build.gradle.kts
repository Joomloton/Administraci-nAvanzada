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
    testImplementation(kotlin("test"))
    implementation("io.javalin:javalin:4.6.4")
    implementation("org.slf4j:slf4j-simple:2.0.0")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.4")
    implementation("org.webjars.npm:vue:2.6.14")
    implementation("org.webjars.npm:vuetify:2.6.9")
    implementation("org.webjars.npm:mdi__font:6.5.95")
    implementation("org.webjars.npm:roboto-fontface:0.10.0")
    implementation("org.webjars.npm:sweetalert2:11.4.24")
}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}

application {
    mainClass.set("MainKt")
}