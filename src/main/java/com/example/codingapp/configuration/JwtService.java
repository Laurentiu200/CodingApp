package com.example.codingapp.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "7debefe575c16c75899f9990fcded50d316fc8226fded116da7dbcf474fabb04cc3fb5e07cba68efe06aa93caaa1299e8b520c8b22a6e06e58db2d95557b408e";

    private static final int TIME_VALID_TOKEN_MINS = 300;

    private static final int MILLISECONDS_TO_SECOND_UNIT = 1000;

    public String extractEmailFromToken(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    public <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver)
    {
        final Claims claims = extractClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    public String generateNewToken(UserDetails userDetails)
    {
        return generateNewToken(new HashMap<>(), userDetails);
    }

    public boolean isValidToken(String jwtToken, UserDetails userDetails)
    {
        final String email = extractEmailFromToken(jwtToken);
        return (email.equals(userDetails.getUsername())) && !isTokenExpired(jwtToken);
    }

    private boolean isTokenExpired(String jwtToken) {
        return extractExpirationTime(jwtToken).before(new Date());
    }

    private Date extractExpirationTime(String token)
    {
        return extractClaim(token, Claims :: getExpiration);
    }

    public String generateNewToken(Map<String, Object> extraClaims, UserDetails userDetails)
    {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + MILLISECONDS_TO_SECOND_UNIT * TIME_VALID_TOKEN_MINS * 100))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extractClaims(String jwtToken)
    {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] key = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(key);
    }
}
