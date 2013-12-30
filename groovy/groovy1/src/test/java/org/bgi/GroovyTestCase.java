package org.bgi;

import groovy.lang.Binding;
import groovy.util.GroovyScriptEngine;

import java.io.File;
import java.net.URI;
import java.net.URL;

import org.bgi.groovy.Context;
import org.junit.Test;

public class GroovyTestCase {
	
	@Test
	public void test1() throws Exception {
		String scriptName = "script1.groovy";
		GroovyScriptEngine gse = new GroovyScriptEngine(new URL[]{getScriptRootDirectory().toURL()});
		Binding binding = new Binding();
		binding.setVariable("MyAppCtx", new Context());
		gse.run(scriptName, binding);
		//System.out.println(binding.getVariable("output"));
		Object entity = binding.getVariable("entity1");
		
		System.out.println(entity);
	}
	
	private URI getScriptRootDirectory(){
		File groovyDir = new File("src/main/groovy");
		return groovyDir.toURI();
	}

}
