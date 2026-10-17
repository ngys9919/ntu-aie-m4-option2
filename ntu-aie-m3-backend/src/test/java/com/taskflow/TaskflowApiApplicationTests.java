package com.taskflow;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class TaskflowApiApplicationTests {

	@Autowired
	private WebApplicationContext context;

	@Test
	void contextLoads() {
	}

	@ParameterizedTest
	@ValueSource(strings = { "GET", "HEAD", "POST", "PUT", "DELETE" })
	void allowsFrontendPreflight(String method) throws Exception {
		String path = method.equals("POST") ? "/api/tasks" : "/api/tasks/1";
		MockMvcBuilders.webAppContextSetup(context).build()
				.perform(options(path)
						.header(HttpHeaders.ORIGIN, "https://task-manager-production.netlify.app")
						.header(HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD, method)
						.header(HttpHeaders.ACCESS_CONTROL_REQUEST_HEADERS, "content-type"))
				.andExpect(status().isOk())
				.andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN,
						"https://task-manager-production.netlify.app"))
				.andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, containsString(method)))
				.andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "content-type"));
	}

	@Test
	void rejectsPreflightFromUnapprovedOrigin() throws Exception {
		MockMvcBuilders.webAppContextSetup(context).build()
				.perform(options("/api/tasks/1")
						.header(HttpHeaders.ORIGIN, "https://unapproved.example")
						.header(HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD, "PUT"))
				.andExpect(status().isForbidden())
				.andExpect(header().doesNotExist(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN));
	}

}
