<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForwardFlashIntoResponseData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $sessionData = session()->all();
        $flashData = collect($sessionData['_flash']['old'])->map(function ($key) use ($sessionData) {
            return ['name' => $key, 'value' => $sessionData[$key]];
        });

        $body = [
            'data' => json_decode($response->getContent()),
            'flash' => $flashData,
        ];

        $response->setContent(json_encode($body));

        return $response;
    }
}
