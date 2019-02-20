package com.example.flex.api.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.example.flex.api.model.Debito;
import com.example.flex.api.repository.DebitoRepository;

@Service
public class DebitoService {
	@Autowired
	private DebitoRepository debitoRepository;
	public Debito atualizar(Debito debito, Long id) {
		Debito debitoSalvo = buscarDebitoPeloId(id);
		BeanUtils.copyProperties(debito, debitoSalvo, "id");
		return debitoRepository.save(debitoSalvo);
	}
	
	public Debito buscarDebitoPeloId(Long id) {
		Debito debitoSalva = debitoRepository.findOne(id);
		if(debitoSalva == null) {
			throw new EmptyResultDataAccessException(1);
		}
		return debitoSalva;
	}
}
