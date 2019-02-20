package com.example.flex.api.resource;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.flex.api.event.RecursoCriadoEvent;
import com.example.flex.api.model.Debito;
import com.example.flex.api.repository.DebitoRepository;
import com.example.flex.api.service.DebitoService;

@RestController
@RequestMapping("/debitos")
public class DebitoResource {
	
	@Autowired
	private DebitoRepository debitoRepository;
	
	@Autowired
	private ApplicationEventPublisher publisher;

	@Autowired
	private DebitoService debitoService;
	
	@CrossOrigin
	@GetMapping
	public List<Debito> listar(){
		return debitoRepository.findAll();
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<Debito> buscarPeloId(@PathVariable Long id) {
		Debito debito = debitoRepository.findOne(id);
		return debito != null ? ResponseEntity.ok(debito) : ResponseEntity.notFound().build();
	}
	
	@CrossOrigin
	@PostMapping
	public ResponseEntity<Debito> criar(@Valid @RequestBody Debito debito, HttpServletResponse response) {
		Debito debitoSalvo = debitoRepository.save(debito);
		publisher.publishEvent(new RecursoCriadoEvent(this, response, debitoSalvo.getId()));
		return ResponseEntity.status(HttpStatus.CREATED).body(debitoSalvo);
	}
	
	@CrossOrigin
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remover(@PathVariable Long id) {
		debitoRepository.delete(id);
	}
	
	@CrossOrigin
	@PutMapping("/{id}")
	public ResponseEntity<Debito> atualizar(@PathVariable Long id, @Valid @RequestBody Debito debito) {
		Debito debitoSalvo = debitoService.atualizar(debito, id); 
		return ResponseEntity.ok(debitoSalvo);
	}
}
